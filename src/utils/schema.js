export function randomId(length = 16) {
	let id = '';
	while (id.length < length) {
		id += String(Math.random()).slice(2);
	}
	return id.slice(0, length);
}
