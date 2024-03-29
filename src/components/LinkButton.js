import classNames from 'classnames';
import React from 'react';

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
