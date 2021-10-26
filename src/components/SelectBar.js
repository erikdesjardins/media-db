import React from 'react';
import LinkButton from './LinkButton';
import classNames from 'classnames';
import { intersperse } from '../utils/array';

export default React.memo(function SelectBar({ options, selected, onSelect }) {
	return (
		<span className="SelectBar">
			{intersperse(options.map(({ value, name }) => (
				<LinkButton
					key={value}
					className={classNames('SelectBar-button', { 'SelectBar-button--active': value === selected })}
					onClick={() => onSelect(value)}
				>
					{name || value}
				</LinkButton>
			)), () => ' ')}
		</span>
	);
});
