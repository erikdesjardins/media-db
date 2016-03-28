export function* range(from, to) {
	for (let i = from; i < to; ++i) { // eslint-disable-line no-restricted-syntax
		yield i;
	}
}
