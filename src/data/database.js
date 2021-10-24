import Dexie from 'dexie';
import deepEqual from 'only-shallow';
import * as productionStatusTypes from '../constants/productionStatusTypes';
import * as statusTypes from '../constants/statusTypes';
import { distinct, map, whereEquals, whereRegex, reverse, sortBy } from '../utils/db';
import { repeatWhile } from '../utils/array';
import { pipe } from '../utils/function';

const db = new Dexie('MediaDB');

db.version(1).stores({
	media: '++,id,date,&[id+date],status,statusDate',
	provider: 'id,&createdDate',
});

db.open();

// db.media (Item)

function validateItem(item) {
	const validItemFields = [
		'id', 'url',
		'thumbnail', 'tinyThumbnail', 'title', 'creator', 'genres', 'characters', 'notes', 'tags', 'length', 'status', 'productionStatus',
		'statusDate', 'date',
	];
	const invalidFields = Object.keys(item).filter(key => !validItemFields.includes(key));
	if (invalidFields.length > 0) {
		throw new Error(`Extraneous item fields: ${invalidFields.join(', ')}`);
	}

	if (typeof item.id !== 'string' || item.id.length === 0) {
		throw new Error(`Invalid item id '${item.id}', must be a nonempty string`);
	}

	if (typeof item.url !== 'string' || item.url.length === 0) {
		throw new Error(`Invalid item url '${item.url}', must be a nonempty string`);
	}

	if (item.thumbnail !== null && (typeof item.thumbnail !== 'string' || item.thumbnail.length === 0)) {
		throw new Error(`Invalid item thumbnail '${item.thumbnail}', must be null or a nonempty string`);
	}

	if (item.tinyThumbnail !== null && (typeof item.tinyThumbnail !== 'string' || item.tinyThumbnail.length === 0)) {
		throw new Error(`Invalid item tinyThumbnail '${item.tinyThumbnail}', must be null or a nonempty string`);
	}

	for (const key of ['title', 'creator', 'genres', 'characters', 'notes', 'tags']) {
		if (typeof item[key] !== 'string') {
			throw new Error(`Invalid item ${key} '${item[key]}', must be a string`);
		}
	}

	if (!Number.isInteger(item.length)) {
		throw new Error(`Invalid item length '${item.length}', must be an integer`);
	}

	const validStatusTypes = Object.values(statusTypes);
	if (!validStatusTypes.includes(item.status)) {
		throw new Error(`Invalid item status '${item.status}', must be one of ${validStatusTypes.join(', ')}`);
	}

	const validProductionStatusTypes = Object.values(productionStatusTypes);
	if (!validProductionStatusTypes.includes(item.productionStatus)) {
		throw new Error(`Invalid item production status '${item.productionStatus}', must be one of ${validProductionStatusTypes.join(', ')}`);
	}

	if (!Number.isInteger(item.statusDate)) {
		throw new Error(`Invalid item statusDate '${item.statusDate}', must be an integer`);
	}

	if (!Number.isInteger(item.date)) {
		throw new Error(`Invalid item date '${item.date}', must be an integer`);
	}
}

function _getItemHistory(id) {
	return db.media.where('[id+date]').between([id, -Infinity], [id, Infinity]);
}

export function getItem(id) {
	return _getItemHistory(id).last();
}

export function getItemHistory(id) {
	return pipe(
		_getItemHistory(id).toArray(),
		map((item, i) => ({
			...item,
			id: `${item.id}-history${i}`,
		})),
	);
}

export function getItems() {
	return pipe(db.media.orderBy('date').toArray(), reverse(), distinct('id'), sortBy('statusDate'));
}

export function getFilteredItems(filterMap) {
	return Object.entries(filterMap).reduce(
		(items, [key, value]) => (value ? pipe(items, whereEquals(key, value)) : items),
		getItems(),
	);
}

// field:regex field2:regex with spaces
export function getQueriedItems(query) {
	const re = /\b(\w+):((?:\S+\s*?)+)\s*(?=\w+:|$)/g;
	return repeatWhile(() => re.exec(query)).reduce(
		(items, [, key, regex]) => (regex ? pipe(items, whereRegex(key, regex)) : items),
		getItems(),
	);
}

export function addItem(id, item) {
	const now = Date.now();
	return db.transaction('rw', db.media, async () => {
		if (await getItem(id)) {
			throw new Error(`Tried to add item with in-use id: ${id}`);
		}
		const newItem = {
			...item,
			id,
			date: now,
			statusDate: now,
		};
		validateItem(newItem);
		db.media.add(newItem);
	});
}

export function updateItem(id, patch) {
	return db.transaction('rw', db.media, async () => {
		const existing = await getItem(id);
		if (!existing) {
			throw new Error(`Tried to update non-extant item with id: ${id}`);
		}
		if ('id' in patch && patch.id !== existing.id) {
			throw new Error(`Tried to change id of item to: ${patch.id}`);
		}
		if ('url' in patch && patch.url !== existing.url) {
			throw new Error(`Tried to change url of item to: ${patch.url}`);
		}
		const updated = { ...existing, ...patch };
		if (deepEqual(existing, updated)) {
			// nothing changed, don't create a new version
			return;
		}
		// something changed, make a new version with new date
		updated.date = Date.now();
		if (updated.status !== existing.status) {
			// status changed, update the statusDate
			updated.statusDate = updated.date;
		}
		// add the new version
		validateItem(updated);
		db.media.add(updated);
	});
}

export function getRawItems() {
	return db.media.toArray();
}

export function setRawItems(items) {
	return db.transaction('rw', db.media, () => {
		db.media.clear();
		db.media.bulkAdd(items);
	});
}

// db.provider (Provider)

function validateProvider(provider) {
	const validProviderFields = [
		'id', 'infoCallback', 'createdDate',
	];
	const invalidFields = Object.keys(provider).filter(key => !validProviderFields.includes(key));
	if (invalidFields.length > 0) {
		throw new Error(`Extraneous provider fields: ${invalidFields.join(', ')}`);
	}

	if (typeof provider.id !== 'string' || provider.id.length === 0) {
		throw new Error(`Invalid provider id '${provider.id}', must be a nonempty string`);
	}

	if (typeof provider.infoCallback !== 'string') {
		throw new Error(`Invalid provider infoCallback '${provider.infoCallback}', must be a string`);
	}

	if (!Number.isInteger(provider.createdDate)) {
		throw new Error(`Invalid provider createdDate '${provider.createdDate}', must be an integer`);
	}
}

export function getProvider(id) {
	return db.provider.get(id);
}

export function getProviders() {
	return db.provider.orderBy('createdDate').toArray();
}

export function addProvider(id) {
	const provider = { id, infoCallback: '', createdDate: Date.now() };
	validateProvider(provider);
	return db.provider.add(provider);
}

export function updateProvider(id, patch) {
	return db.transaction('rw', db.provider, async () => {
		const existing = await getProvider(id);
		if (!existing) {
			throw new Error(`Tried to update non-extant provider with id: ${id}`);
		}
		if ('id' in patch && patch.id !== existing.id) {
			throw new Error(`Tried to change id of provider (to ${patch.id})`);
		}
		if ('createdDate' in patch && patch.createdDate !== existing.createdDate) {
			throw new Error(`Tried to change createdDate of provider (to ${patch.id})`);
		}
		const updated = { ...existing, ...patch };
		validateProvider(updated);
		db.provider.update(id, patch);
	});
}

export function removeProvider(id) {
	return db.provider.delete(id);
}
