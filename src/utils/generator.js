export function* repeatWhile(callback) {
	let val;
	while ((val = callback())) {
		yield val;
	}
}

const SENTINEL = {};
export function reduce(callback, initialValue = SENTINEL) {
	let accum = initialValue;
	let i = 0;
	for (const currentValue of this) {
		if (accum === SENTINEL) {
			accum = currentValue;
		} else {
			accum = callback(accum, currentValue, i);
		}
		i++;
	}
	return accum;
}
