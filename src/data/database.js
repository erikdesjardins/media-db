import Dexie from 'dexie';
// to "polyfill" async functions
const Promise = Dexie.Promise; // eslint-disable-line no-unused-vars

export class Item {}
export class Provider {}
export class User {}

const db = new Dexie('MediaDB');

db.version(1).stores({
	media: '++,id,collisionId,title,creator,*genres,*characters,length,status,productionStatus,date,&[id+date]',
	provider: 'id',
});

db.open().catch(::console.error); // eslint-disable-line no-console

db.media.mapToClass(Item);
db.provider.mapToClass(Provider);

// db.media (Item)

function current() {
	return this.orderBy('date').reverse()::distinct('id');
}

function distinct(key) {
	const seenKeys = new Set();
	return this.and(({ [key]: k }) => !seenKeys.has(k) && seenKeys.add(k));
}

export function getItemHistory(id) {
	return db.media.where('id').equals(id).orderBy('date').toArray();
}

export function getItem(id) {
	return db.media.where('id').equals(id)::current().first();
}

export function getItems() {
	return db.media::current().toArray();
}

export function addItem(item) {
	return db.media.add(item);
}

// db.provider (Provider)

export function getProvider(id) {
	return db.provider.get(id);
}

export function getProviders() {
	return db.provider.toArray();
}

export function addProvider(id) {
	return db.provider.add({ id });
}

export function updateProvider(id, patch) {
	return db.provider.update(id, patch);
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
