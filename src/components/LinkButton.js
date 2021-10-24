import React from 'react';
import classNames from 'classnames';

export default React.memo(function LinkButton({ className, title, disabled, onClick, children }) {
	const handleClick = e => {
		e.preventDefault();
		if (!disabled) {
			onClick();
		}
	};

	return (
		<a
			className={classNames('LinkButton', className)}
			href={disabled ? null : '#'}
			title={title}
			onClick={handleClick}
		>
			{children}
		</a>
	);
});
