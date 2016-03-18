import Dexie from 'dexie';
// to "polyfill" async functions
const Promise = Dexie.Promise; // eslint-disable-line no-unused-vars

// Model types
export class Item {}

const db = new Dexie('MediaDB');

db.version(1).stores({ media: ',id,title,creator,*genres,*characters,length,status,productionStatus,date,&[id+date]' });

db.media.mapToClass(Item, {
	id: String,
	title: String,
	creator: String,
	genres: [String],
	characters: [String],
	length: Number,
	status: String,
	productionStatus: String,
	date: Number,
});

function current() {
	this.orderBy('date').reverse().distinct(); // eslint-disable-line no-invalid-this
}

export function getItemHistory(id) {
	return db.transaction('r', db.media, () =>
		db.media.get(id).orderBy('date').reverse().toArray()
	);
}

export function getItem(id) {
	return db.transaction('r', db.media, () =>
		db.media::current().get(id).first()
	);
}

export function getItems(limit = Infinity, offset = 0) {
	return db.transaction('r', db.media, () =>
		db.media::current().offset(offset).limit(limit).toArray()
	);
}

export function addItem(id) {
	return db.transaction('rw', db.media, () =>
		db.media.add({ id, date: Date.now() })
	);
}

export function getItemsByCreator(creator) {
	return db.transaction('r', db.media, () =>
		db.media::current().where('creator').equals(creator).toArray()
	);
}

export function getItemsByGenre(genre) {
	return db.transaction('r', db.media, () =>
		db.media::current().where('genres').equals(genre).toArray()
	);
}

export function getItemsByCharacter(character) {
	return db.transaction('r', db.media, () =>
		db.media::current().where('characters').equals(character).toArray()
	);
}
