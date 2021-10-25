export function pmod(x, n) {
	// "positive modulus" (there's probably a proper name for this...maybe this is what euclidean modulo is)
	return ((x % n) + n) % n;
}

export function roundDownToMultiple(x, n) {
	return x - (x % n);
}
