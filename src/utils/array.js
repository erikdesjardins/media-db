export function repeatWhile(callback) {
	const arr = [];
	let x;
	while ((x = callback())) {
		arr.push(x);
	}
	return arr;
}

export function intersperse(xs, f) {
	const arr = [];
	for (let i = 0; i < xs.length; ++i) {
		if (i > 0) {
			arr.push(f());
		}
		arr.push(xs[i]);
	}
	return arr;
}

export function zipWith(xs, ys, f) {
	if (xs.length !== ys.length) {
		throw new Error(`zipWith: expected lengths to be equal (${xs.length} !== ${ys.length})`);
	}
	const arr = [];
	for (let i = 0; i < xs.length; ++i) {
		const x = xs[i];
		const y = ys[i];
		arr.push(f(x, y));
	}
	return arr;
}

export function sortBy(xs, f) {
	const arr = xs.slice();
	arr.sort((a, b) => {
		const aKey = f(a);
		const bKey = f(b);
		if (aKey < bKey) {
			return -1;
		}
		if (aKey > bKey) {
			return 1;
		}
		return 0;
	});
	return arr;
}
