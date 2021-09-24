export function pipe(init, ...fs) {
	return fs.reduce((x, f) => f(x), init);
}
