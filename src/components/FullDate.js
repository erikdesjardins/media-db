import { formatFullDate } from '../utils/date';
import React from 'react';

export default React.memo(function FullDate({ date }) {
	return (
		<span
			className="FullDate"
			title={`...and ${new Date(date).getSeconds()} seconds`}
		>
			{formatFullDate(date)}
		</span>
	);
});
