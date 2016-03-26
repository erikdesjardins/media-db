import React, { PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default class SelectBar extends React.Component {
	static propTypes = {
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.any.isRequired,
			name: PropTypes.node,
		})).isRequired,
		selected: PropTypes.string,
		onSelect: PropTypes.func,
		bsSize: Button.propTypes.bsSize,
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
			<ButtonGroup bsSize={this.props.bsSize}>
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