import React from 'react';
import CenteredColumn from '../components/CenteredColumn';
import StorageEdit from '../components/StorageEdit';

export default function Storage() {
	return (
		<CenteredColumn className="Storage">
			<StorageEdit/>
		</CenteredColumn>
	);
}
