import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class AutosaveInput extends React.PureComponent {
	static propTypes = {
		type: PropTypes.string,
		className: PropTypes.string,
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
		const class_ = classNames('AutosaveInput', { 'AutosaveInput--dirty': this.isDirty() }, this.props.className);

		return this.props.type === 'textarea' ? (
			<textarea
				className={class_}
				value={this.state.value}
				onChange={this.handleChange}
				onBlur={this.handleBlur}
			/>
		) : (
			<input
				type={this.props.type}
				className={class_}
				value={this.state.value}
				onChange={this.handleChange}
				onBlur={this.handleBlur}
			/>
		);
	}
}
