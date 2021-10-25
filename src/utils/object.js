export function property(obj, path) {
	let prop = obj;
	for (const key of path) {
		// eslint-disable-next-line no-param-reassign
		prop = prop[key];
	}
	return prop;
}
