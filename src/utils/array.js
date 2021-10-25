export function repeatWhile(callback) {
	const arr = [];
	let val;
	while ((val = callback())) {
		arr.push(val);
	}
	return arr;
}

export function intersperse(items, f) {
	const arr = [];
	// eslint-disable-next-line no-restricted-syntax
	for (let i = 0; i < items.length; ++i) {
		arr.push(items[i]);
		if (i > 0) {
			arr.push(f());
		}
	}
	return arr;
}
