export function property(obj, path) {
	let prop = obj;
	for (const key of path) {
		// eslint-disable-next-line no-param-reassign
		prop = prop[key];
	}
	return prop;
}

// Compare two objects structurally.
// Recursively compares own properties using strict equality*.
// Does not check prototypes*.
// Does not handle cyclic references.
// * With the exception of `Date` objects, which are treated like a primitive type (as if `typeof === 'date'`).
export function structuralEq(a, b) {
	// 1. Strict equality
	if (a === b) {
		return true;
	}
	// 2. Exclude nulls
	if (a === null || b === null) {
		return false;
	}
	// 3. Exclude non-objects
	if (typeof a !== 'object' || typeof b !== 'object') {
		return false;
	}
	// 4. Handle `Date`
	if (a instanceof Date || b instanceof Date) {
		return a instanceof Date && b instanceof Date && a.valueOf() === b.valueOf();
	}
	// 5. Compare objects
	const aKeys = Object.keys(a);
	const bKeys = Object.keys(b);
	// 5.1. Exclude different key counts
	if (aKeys.length !== bKeys.length) {
		return false;
	}
	aKeys.sort();
	bKeys.sort();
	for (let i = 0; i < aKeys.length; ++i) {
		const aKey = aKeys[i];
		const bKey = bKeys[i];
		// 5.2. Exclude different key names
		if (aKey !== bKey) {
			return false;
		}
		// 5.3. Recurse onto values
		if (!structuralEq(a[aKey], b[aKey])) {
			return false;
		}
	}
	return true;
}
