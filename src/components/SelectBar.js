import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/es/Button';
import ButtonGroup from 'react-bootstrap/es/ButtonGroup';

export default class SelectBar extends React.PureComponent {
	static propTypes = {
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.any.isRequired,
			name: PropTypes.node,
		})).isRequired,
		selected: PropTypes.string,
		onSelect: PropTypes.func.isRequired,
		bsSize: Button.propTypes.bsSize,
		style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	};

	isSelected(value) {
		return this.props.selected === value;
	}

	handleClick(value) {
		this.props.onSelect(value);
	}

	render() {
		return (
			<ButtonGroup bsSize={this.props.bsSize} style={this.props.style}>
				{this.props.options.map(({ value, name }) =>
					<Button
						key={value}
						active={this.isSelected(value)}
						onClick={() => this.handleClick(value)}
					>
						{name || value}
					</Button>
				)}
			</ButtonGroup>
		);
	}
}
