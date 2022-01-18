import classNames from 'classnames';
import React, { useState } from 'react';

export default React.memo(function AutosaveInput({ type, rows, className, defaultValue, onSave }) {
	const [value, setValue] = useState(defaultValue);
	const [prevDefaultValue, setPrevDefaultValue] = useState(defaultValue);
	// if the default value is changed, `value` should follow `defaultValue` to avoid dirtying the component
	if (defaultValue !== prevDefaultValue) {
		setValue(defaultValue);
		setPrevDefaultValue(defaultValue);
	}

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
			rows={rows}
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
