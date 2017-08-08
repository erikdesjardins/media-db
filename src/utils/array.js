export function repeatWhile(callback) {
	const arr = [];
	let val;
	while ((val = callback())) {
		arr.push(val);
	}
	return arr;
}
