import React from 'react';
import LinkButton from './LinkButton';
import classNames from 'classnames';

export default React.memo(function SelectBar({ options, selected, onSelect }) {
	return (
		<div className="SelectBar">
			{options.map(({ value, name }) => [
				' ',
				<LinkButton
					key={value}
					className={classNames('SelectBar-button', { 'SelectBar-button--active': value === selected })}
					onClick={() => onSelect(value)}
				>
					{name || value}
				</LinkButton>,
			]).flat().slice(1)}
		</div>
	);
});
