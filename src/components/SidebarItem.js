import React, { useState } from 'react';
import SidebarInfo from './SidebarInfo';
import SidebarHistory from './SidebarHistory';
import SelectBar from './SelectBar';

export default function SidebarItem({ itemId }) {
	const [showInfo, setShowInfo] = useState(true);

	return (
		<fieldset className="SidebarItem">
			<legend className="SidebarItem-legend">
				<SelectBar
					selected={showInfo}
					onSelect={setShowInfo}
					options={[{
						value: true,
						name: 'Info',
					}, {
						value: false,
						name: 'History',
					}]}
				/>
			</legend>
			{showInfo ?
				<SidebarInfo itemId={itemId}/> :
				<SidebarHistory itemId={itemId}/>
			}
		</fieldset>
	);
}
