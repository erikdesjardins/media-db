import _ from 'lodash-es';

export function whereEquals(key, val) {
	return promise => promise.then(arr => arr.filter(({ [key]: v }) => v === val));
}

export function whereRegex(key, regex) {
	return promise => promise.then(arr => {
		const re = new RegExp(regex, 'i');
		return arr.filter(({ [key]: v }) => re.test(v));
	});
}

export function reverse() {
	return promise => promise.then(arr => arr.reverse());
}

export function sortBy(key) {
	return promise => promise.then(arr => _.sortBy(arr, ({ [key]: v }) => v));
}

export function distinct(key) {
	return promise => promise.then(arr => {
		const seen = new Set();
		return arr.filter(({ [key]: v }) => !seen.has(v) && seen.add(v));
	});
}

export function map(callback, thisArg) {
	return promise => promise.then(arr => arr.map(callback, thisArg));
}
