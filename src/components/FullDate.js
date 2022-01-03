import { formatFullDate } from '../utils/date';
import React from 'react';

export default React.memo(function FullDate({ date }) {
	const seconds = new Date(date).getSeconds();
	return (
		<span
			className="FullDate"
			title={`...and ${seconds} ${seconds === 1 ? 'second' : 'seconds'}`}
		>
			{formatFullDate(date)}
		</span>
	);
});
