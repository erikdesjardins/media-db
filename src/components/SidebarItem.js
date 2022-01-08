import classNames from 'classnames';
import { useState } from 'react';
import SelectBar from './SelectBar';
import SidebarHistory from './SidebarHistory';
import SidebarInfo from './SidebarInfo';

export default function SidebarItem({ itemId: id, onClickItemHistory }) {
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
				<SidebarInfo itemId={id}/> :
				<SidebarHistory itemId={id} onClickItemHistory={onClickItemHistory}/>
			}
		</fieldset>
	);
}
