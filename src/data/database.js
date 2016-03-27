import Dexie from 'dexie';
// to "polyfill" async functions
const Promise = Dexie.Promise; // eslint-disable-line no-unused-vars

export class Item {}
export class Provider {}
export class User {}

const db = new Dexie('MediaDB');

db.version(1).stores({
	media: '++,id,collisionId,title,creator,*genres,*characters,length,status,productionStatus,date,&[id+date]',
	provider: 'id,&createdDate',
});

db.open().catch(::console.error); // eslint-disable-line no-console

db.media.mapToClass(Item);
db.provider.mapToClass(Provider);

// Promise<Array> -> Promise<Array>
function whereEquals(key, val) {
	return this.then(arr => arr.filter(({ [key]: v }) => v === val));
}

// Promise<Array> -> Promise<Array>
function whereEqualsIf(key, val, shouldApply) {
	if (!shouldApply) return this;
	return this::whereEquals(key, val);
}

// Promise<Array> -> Promise<Array>
function reverse() {
	return this.then(arr => arr.reverse());
}

// Promise<Array<T>> -> T
function first() {
	return this.then(arr => arr[0]);
}

// Collection -> Collection
function distinct(key) {
	const seen = new Set();
	return this.and(({ [key]: v }) => !seen.has(v) && seen.add(v));
}

// db.media (Item)

// Table -> Promise<Array>
function current() {
	return this.orderBy('date').reverse()::distinct('id').sortBy('statusDate')::reverse();
}

export function getItems() {
	return db.media::current();
}

export function getItem(id) {
	return getItems()::whereEquals('id', id)::first();
}

export function getItemHistory(id) {
	return db.media.where('id').equals(id).sortBy('date')::reverse();
}

export function getItemsWithStatus(status) {
	return getItems()::whereEqualsIf('status', status, !!status);
}

export function addItem(id, item) {
	const now = Date.now();
	return db.media.add({
		...item,
		id,
		date: now,
		statusDate: now,
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
