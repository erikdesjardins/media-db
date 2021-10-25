import { useState } from 'react';
import classNames from 'classnames';
import SidebarInfo from './SidebarInfo';
import SidebarHistory from './SidebarHistory';
import SelectBar from './SelectBar';

export default function SidebarItem({ itemId }) {
	const [showInfo, setShowInfo] = useState(true);

	return (
		<fieldset className={classNames('SidebarItem', { 'Utils-fieldset--noPadding': !showInfo })}>
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
