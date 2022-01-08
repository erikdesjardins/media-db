import classNames from 'classnames';
import React from 'react';
import { intersperse } from '../utils/array';
import LinkButton from './LinkButton';

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
