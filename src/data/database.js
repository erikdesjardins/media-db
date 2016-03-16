import Dexie from 'dexie';
// to "polyfill" async functions
const Promise = Dexie.Promise; // eslint-disable-line no-unused-vars

// Model types
export class Item {
	id: string;
	title: string;
	author: string;
	genres: Array<string>;
	characters: Array<string>;
	length: number;
	rating: number;
	date: number;

	constructor(id, title, author, genres, characters, length, rating, date) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.genres = genres;
		this.characters = characters;
		this.length = length;
		this.rating = rating;
		this.date = date;
	}
}

const db = new Dexie('MediaDB');

db.version(1).stores({ media: 'id,title,author,*genres,*characters,length,rating,date' });

db.media.mapToClass(Item, {
	id: String,
	title: String,
	author: String,
	genres: [String],
	characters: [String],
	length: Number,
	rating: Number,
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

export function getItems(limit, offset = 0) {
	return db.transaction('r', db.media, () =>
		db.media::current().offset(offset).limit(limit).toArray()
	);
}

export function getItemsByAuthor(author) {
	return db.transaction('r', db.media, () =>
		db.media::current().where('author').equals(author).toArray()
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
