import _ from 'lodash-es';

export function whereEquals(key, val) {
	return this.then(arr => arr.filter(({ [key]: v }) => v === val));
}

export function whereRegex(key, regex) {
	return this.then(arr => {
		const re = new RegExp(regex, 'i');
		return arr.filter(({ [key]: v }) => re.test(v));
	});
}

export function reverse() {
	return this.then(arr => arr.reverse());
}

export function sortBy(key) {
	return this.then(arr => _.sortBy(arr, ({ [key]: v }) => v));
}

export function distinct(key) {
	return this.then(arr => {
		const seen = new Set();
		return arr.filter(({ [key]: v }) => !seen.has(v) && seen.add(v));
	});
}

export function map(callback, thisArg) {
	return this.then(arr => arr.map(callback, thisArg));
}
