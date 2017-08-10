export function formatIsoDate(date /*: number */) {
	const parsed = new Date(date);
	const year = parsed.getFullYear(); // 2017
	const month = parsed.getMonth(); // 0-11
	const day = parsed.getDate(); // 1-31
	return `${
		year.toString()
	}-${
		(month + 1).toString().padStart(2, '0')
	}-${
		day.toString().padStart(2, '0')
	}`;
}

function pmod(x, n) {
	return ((x % n) + n) % n;
}

export function formatFullDate(date /*: number */) {
	const parsed = new Date(date);
	const hour = parsed.getHours(); // 0-23
	const minute = parsed.getMinutes(); // 0-59
	return `${
		formatIsoDate(date)
	}, ${
		// getHours() returns 0-23
		//  | | - - - - - - - - - | | | - - - - - - - - - |
		//  0 1                 11 12 13                 23
		// decrement to wrap around 0
		//  | | - - - - - - - - - | | | - - - - - - - - - |
		// -1 0                 10 11 12                 22
		// positive modulus to finish wrapping around zero and collapse the range
		//  | | - - - - - - - - - | | | - - - - - - - - - |
		// 11 0                 10 11 0                  10
		// increment to realign range / eliminate 0
		//  | | - - - - - - - - - | | | - - - - - - - - - |
		// 12 1                 11 12 1                  11
		pmod(hour - 1, 12) + 1
	}:${
		minute.toString().padStart(2, '0')
	} ${
		(12 <= hour && hour <= 23) ? 'pm' : 'am'
	}`;
}
