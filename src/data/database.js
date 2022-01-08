import { openDB, unwrap } from 'idb';
import * as productionStatusTypes from '../constants/productionStatusTypes';
import * as statusTypes from '../constants/statusTypes';
import { distinctBy, repeatWhile, sortBy } from '../utils/array';
import { pipe } from '../utils/function';
import { structuralEq } from '../utils/object';

const idbReady = openDB('MediaDB', 1, {
	upgrade(db /* , oldVersion, newVersion, transaction */) {
		const media = db.createObjectStore('media', { keyPath: ['id', 'date'] });
		media.createIndex('date', 'date');

		const provider = db.createObjectStore('provider', { keyPath: 'id' });
		provider.createIndex('createdDate', 'createdDate', { unique: true });
	},
});

async function transaction(storeNames, mode, callback) {
	const idb = await idbReady;
	const tx = idb.transaction(storeNames, mode);
	let result;
	try {
		result = await callback(tx);
	} catch (e) {
		if (tx.error) {
			// eslint-disable-next-line no-console
			console.error('Overridden error during transaction:', e);
			throw tx.error;
		} else {
			tx.abort();
			throw e;
		}
	}
	tx.commit();
	return result;
}

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

export function getItem(id) {
	return transaction(['media'], 'readonly', async tx => {
		// seek through all versions with this id in reverse order by date, i.e. get the most recent version
		const cursor = await tx.store.openCursor(IDBKeyRange.bound([id, -Infinity], [id, Infinity]), 'prev');
		if (!cursor) {
			throw new Error(`Could not find item with id: ${id}`);
		}
		return cursor.value;
	});
}

export function getItemHistory(id) {
	return transaction(['media'], 'readonly', async tx => {
		const history = await tx.store.getAll(IDBKeyRange.bound([id, -Infinity], [id, Infinity]));
		return history;
	});
}

export function getItemHistoryAt(id, date) {
	return transaction(['media'], 'readonly', async tx => {
		const item = await tx.store.get([id, date]);
		if (!item) {
			throw new Error(`Could not find item history with id: ${id}, date: ${date}`);
		}
		return item;
	});
}

export function getItems() {
	return transaction(['media'], 'readonly', async tx => {
		const items = await tx.store.index('date').getAll(IDBKeyRange.bound(-Infinity, Infinity));
		return pipe(
			items,
			items => items.reverse(),
			items => distinctBy(items, item => item.id),
			items => sortBy(items, item => item.statusDate),
		);
	});
}

export async function getItemsFiltered(filterMap) {
	const items = await getItems();
	return Object.entries(filterMap).reduce(
		(items, [key, value]) => items.filter(item => item[key] === value),
		items,
	);
}

// field:regex field2:regex with spaces
export async function getItemsQueried(query) {
	const items = await getItems();
	const re = /\b(\w+):((?:\S+\s*?)+)\s*(?=\w+:|$)/g;
	return repeatWhile(() => re.exec(query)).reduce(
		(items, [, key, regex]) => {
			const re = new RegExp(regex, 'i');
			return items.filter(item => re.test(item[key]));
		},
		items,
	);
}

export function addItem(id, item) {
	const now = Date.now();
	return transaction(['media'], 'readwrite', async tx => {
		const cursor = await tx.store.openCursor(IDBKeyRange.bound([id, -Infinity], [id, Infinity]), 'prev');
		if (cursor) {
			throw new Error(`Tried to add item with in-use id: ${id}`);
		}
		const newItem = {
			...item,
			id,
			date: now,
			statusDate: now,
		};
		validateItem(newItem);
		await tx.store.add(newItem);
	});
}

export function updateItem(id, patch) {
	return transaction(['media'], 'readwrite', async tx => {
		const cursor = await tx.store.openCursor(IDBKeyRange.bound([id, -Infinity], [id, Infinity]), 'prev');
		if (!cursor) {
			throw new Error(`Tried to update non-extant item with id: ${id}`);
		}
		const existing = cursor.value;
		if ('id' in patch && patch.id !== existing.id) {
			throw new Error(`Tried to change id of item to: ${patch.id}`);
		}
		if ('url' in patch && patch.url !== existing.url) {
			throw new Error(`Tried to change url of item to: ${patch.url}`);
		}
		const updated = { ...existing, ...patch };
		if (structuralEq(existing, updated)) {
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
		await tx.store.add(updated);
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
	return transaction(['provider'], 'readonly', async tx => {
		const provider = await tx.store.get(id);
		if (!provider) {
			throw new Error(`Could not find provider with id: ${id}`);
		}
		return provider;
	});
}

export function getProviders() {
	return transaction(['provider'], 'readonly', async tx => {
		const providers = await tx.store.index('createdDate').getAll();
		return providers;
	});
}

export function addProvider(id) {
	const now = Date.now();
	return transaction(['provider'], 'readwrite', async tx => {
		const provider = { id, infoCallback: '', createdDate: now };
		validateProvider(provider);
		await tx.store.add(provider);
	});
}

export function updateProvider(id, patch) {
	return transaction(['provider'], 'readwrite', async tx => {
		const cursor = await tx.store.openCursor(IDBKeyRange.only(id));
		if (!cursor) {
			throw new Error(`Tried to update non-extant provider with id: ${id}`);
		}
		const existing = cursor.value;
		if ('id' in patch && patch.id !== existing.id) {
			throw new Error(`Tried to change id of provider (to ${patch.id})`);
		}
		if ('createdDate' in patch && patch.createdDate !== existing.createdDate) {
			throw new Error(`Tried to change createdDate of provider (to ${patch.id})`);
		}
		const updated = { ...existing, ...patch };
		validateProvider(updated);
		await cursor.update(updated);
	});
}

export function removeProvider(id) {
	return transaction(['provider'], 'readwrite', async tx => {
		await tx.store.delete(id);
	});
}

// Bulk imports/exports

export function getRawData() {
	return transaction(['media', 'provider'], 'readonly', async tx => {
		const media = await tx.objectStore('media').getAll();
		const provider = await tx.objectStore('provider').getAll();
		const backup = {
			version: 1,
			tables: {
				media,
				provider,
			},
		};
		return backup;
	});
}

export async function setRawData(backup) {
	let media, provider;
	if (Array.isArray(backup)) {
		// Version 0: no version flag, toplevel array of media, no providers
		media = backup;
	} else if ('version' in backup) {
		switch (backup.version) {
			case 1:
				// Version 1: media + provider
				({ tables: { media, provider } } = backup);
				break;
			default:
				throw new Error(`Invalid backup version: ${backup.version}`);
		}
	} else {
		throw new Error('Unrecognised backup format');
	}

	await transaction(['media', 'provider'], 'readwrite', async tx => {
		if (media) {
			const store = tx.objectStore('media');
			await store.clear();
			// use raw add operations to avoid overhead of listening to onsuccess
			// see https://stackoverflow.com/a/52555073
			const rawStore = unwrap(store);
			for (const item of media.slice(0, -1)) {
				rawStore.add(item);
			}
			// ...but listen on last item to ensure we get exception for bad data
			for (const lastItem of media.slice(-1)) {
				// eslint-disable-next-line no-await-in-loop
				await store.add(lastItem);
			}
		}
		if (provider) {
			const store = tx.objectStore('provider');
			await store.clear();
			for (const p of provider) {
				// eslint-disable-next-line no-await-in-loop
				await store.add(p);
			}
		}
	});
}
