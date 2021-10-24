import React, { useRef, useState } from 'react';
import classNames from 'classnames';

export default React.memo(function AutosaveInput({ type, className, defaultValue, onSave }) {
	// eslint-disable-next-line prefer-const
	let [value, setValue] = useState(defaultValue);

	// if the component is clean and the default value is changed,
	// `value` should follow `defaultValue` to avoid dirtying the component
	const previousDefaultValue = useRef(defaultValue);
	if (value === previousDefaultValue.current && defaultValue !== previousDefaultValue.current) {
		setValue(defaultValue);
		value = defaultValue;
	}
	previousDefaultValue.current = defaultValue;

	const isDirty = String(value) !== String(defaultValue);

	const handleBlur = () => {
		if (isDirty) {
			onSave(value);
		}
	};

	const handleChange = e => {
		setValue(e.target.value);
	};

	const class_ = classNames('AutosaveInput', { 'AutosaveInput--dirty': isDirty }, className);

	return type === 'textarea' ? (
		<textarea
			className={class_}
			value={value}
			onChange={handleChange}
			onBlur={handleBlur}
		/>
	) : (
		<input
			type={type}
			className={class_}
			value={value}
			onChange={handleChange}
			onBlur={handleBlur}
		/>
	);
});
