import { range } from './generator';

export function intersperse(element) {
	if (!this.length) {
		return [];
	}

	const result = [this[0]];
	for (const i of range(1, this.length)) {
		result.push(element, this[i]);
	}
	return result;
}
