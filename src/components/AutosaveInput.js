import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';

export default class AutosaveInput extends React.Component {
	static propTypes = {
		type: Input.propTypes.type,
		label: PropTypes.node,
		style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		hasFeedback: PropTypes.bool,
		defaultValue: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
		onSave: PropTypes.func,
	};

	state = {
		value: this.props.defaultValue,
	};

	isDirty() {
		return this.state.value !== this.props.defaultValue;
	}

	save = _.debounce(() => {
		this.props.onSave(this.state.value);
	}, 1000);

	handleChange = e => {
		this.setState({ value: e.target.value });
		this.save();
	};

	render() {
		return (
			<Input
				bsSize="small"
				type={this.props.type}
				label={this.props.label}
				style={this.props.style}
				hasFeedback={this.props.hasFeedback}
				bsStyle={this.isDirty() ? 'warning' : null}
				value={this.state.value}
				onChange={this.handleChange}
			/>
		);
	}
}
