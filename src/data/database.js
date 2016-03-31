import _ from 'lodash';
import Dexie from 'dexie';
import deepEqual from 'only-shallow';
import { distinct, map, whereEquals, whereRegex, reverse } from '../utils/db';
import { reduce, repeatWhile } from '../utils/generator';

export class Item {}
export class Provider {}
export class User {}

const db = new Dexie('MediaDB');

db.version(1).stores({
	media: '++,id,date,&[id+date],status,statusDate',
	provider: 'id,&createdDate',
});

db.open().catch(::console.error); // eslint-disable-line no-console

db.media.mapToClass(Item);
db.provider.mapToClass(Provider);

// db.media (Item)

function _getItemHistory(id) {
	return db.media.where('[id+date]').between([id, -Infinity], [id, Infinity]);
}

export function getItem(id) {
	return _getItemHistory(id).last();
}

export function getItemHistory(id) {
	return _getItemHistory(id).toArray()::map((item, i) => ({
		...item,
		id: `${item.id}-history${i}`,
	}));
}

export function getItems() {
	return db.media.orderBy('date').reverse()::distinct('id').sortBy('statusDate')::reverse();
}

export function getFilteredItems(filterMap) {
	return _.toPairs(filterMap).reduce(
		(items, [key, value]) => (value ? items::whereEquals(key, value) : items),
		getItems()
	);
}

// field:regex field2:regex with spaces
export function getQueriedItems(query) {
	const re = /\b(\w+):((?:\S+\s*?)+)\s*(?=\w+:|$)/g;
	return repeatWhile(() => re.exec(query))::reduce(
		(items, [, key, regex]) => (regex ? items::whereRegex(key, regex) : items),
		getItems()
	);
}

export function addItem(id, item) {
	const now = Date.now();
	return db.transaction('rw', db.media, function* trans() {
		if (yield getItem(id)) {
			throw new Error(`Tried to add item with in-use id: ${id}`);
		}
		db.media.add({
			...item,
			id,
			date: now,
			statusDate: now,
		});
	});
}

export function updateItem(id, patch) {
	// using a generator here instead of async because Dexie wants you to polyfill their Promise impl
	// and I'm not convinced that Babel's transformed async functions will use it
	return db.transaction('rw', db.media, function* trans() {
		const existing = yield getItem(id);
		if (!existing) {
			throw new Error(`Tried to update non-extant item with id: ${id}`);
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

export function getProvider(id) {
	return db.provider.get(id);
}

export function getProviders() {
	return db.provider.orderBy('createdDate').toArray();
}

export function addProvider(id) {
	return db.provider.add({ id, infoCallback: '', createdDate: Date.now() });
}

export function updateProvider(id, infoCallback) {
	return db.provider.update(id, { infoCallback });
}

export function removeProvider(id) {
	return db.provider.delete(id);
}

// mocked db (User)

const VIEWER_ID = 'hardcoded_viewer_id';

const viewer = new User();
viewer.id = VIEWER_ID;

const usersById = {
	[VIEWER_ID]: viewer,
};

export function getUser(id) {
	return usersById[id];
}

export function getViewer() {
	return getUser(VIEWER_ID);
}
