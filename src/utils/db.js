// Promise<Array> -> Promise<Array>
export function whereEquals(key, val) {
	return this.then(arr => arr.filter(({ [key]: v }) => v === val));
}

// Promise<Array> -> Promise<Array>
export function reverse() {
	return this.then(arr => arr.reverse());
}

// Collection -> Collection
export function distinct(key) {
	const seen = new Set();
	return this.and(({ [key]: v }) => !seen.has(v) && seen.add(v));
}