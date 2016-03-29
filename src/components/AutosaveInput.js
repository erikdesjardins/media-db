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

	componentWillReceiveProps(nextProps) {
		// if the component is clean and the default value is changed,
		// `value` should follow `defaultValue` to avoid dirtying the component
		if (!this.isDirty() && nextProps.defaultValue !== this.props.defaultValue) {
			this.setState({
				value: nextProps.defaultValue,
			});
		}
	}

	isDirty() {
		return String(this.state.value) !== String(this.props.defaultValue);
	}

	handleBlur = () => {
		this.props.onSave(this.state.value);
	};

	handleChange = e => {
		this.setState({ value: e.target.value });
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
				onBlur={this.handleBlur}
			/>
		);
	}
}
