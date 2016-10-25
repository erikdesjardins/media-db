import React, { PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default class SelectBar extends React.PureComponent {
	static propTypes = {
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.any.isRequired, // eslint-disable-line react/no-unused-prop-types
			name: PropTypes.node, // eslint-disable-line react/no-unused-prop-types
		})).isRequired,
		selected: PropTypes.string,
		onSelect: PropTypes.func,
		bsSize: Button.propTypes.bsSize,
		style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	};

	static defaultProps = {
		onSelect: () => {},
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
