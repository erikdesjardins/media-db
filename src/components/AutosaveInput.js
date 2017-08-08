import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

export default class AutosaveInput extends React.PureComponent {
	static propTypes = {
		type: FormControl.propTypes.type,
		componentClass: FormControl.propTypes.componentClass,
		label: PropTypes.node,
		style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		hasFeedback: PropTypes.bool,
		defaultValue: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
		onSave: PropTypes.func.isRequired,
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
		if (this.isDirty()) {
			this.props.onSave(this.state.value);
		}
	};

	handleChange = e => {
		this.setState({ value: e.target.value });
	};

	render() {
		return (
			<FormGroup
				bsSize="small"
				validationState={this.isDirty() ? 'warning' : null}
			>
				{this.props.label &&
					<ControlLabel>{this.props.label}</ControlLabel>
				}
				<FormControl
					type={this.props.type}
					componentClass={this.props.componentClass}
					style={this.props.style}
					value={this.state.value}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
				/>
				{this.props.hasFeedback &&
					<FormControl.Feedback/>
				}
			</FormGroup>
		);
	}
}
