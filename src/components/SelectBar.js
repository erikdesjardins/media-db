import React from 'react';
import PropTypes from 'prop-types';
import LinkButton from './LinkButton';
import classNames from 'classnames';

export default class SelectBar extends React.PureComponent {
	static propTypes = {
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.any.isRequired,
			name: PropTypes.node,
		})).isRequired,
		selected: PropTypes.string,
		onSelect: PropTypes.func.isRequired,
	};

	isSelected(value) {
		return this.props.selected === value;
	}

	handleClick(value) {
		this.props.onSelect(value);
	}

	render() {
		return (
			<div className="SelectBar">
				{this.props.options.map(({ value, name }) =>
					<LinkButton
						key={value}
						className={classNames('SelectBar-button', { 'SelectBar-button--active': this.isSelected(value) })}
						onClick={() => this.handleClick(value)}
					>
						{name || value}
					</LinkButton>
				)}
			</div>
		);
	}
}
