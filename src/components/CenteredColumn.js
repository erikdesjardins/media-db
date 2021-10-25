import React from 'react';
import classNames from 'classnames';

export default function CenteredColumn({ className, children }) {
	return (
		<div className={classNames('CenteredColumn', className)}>
			<div className="CenteredColumn-content">
				{children}
			</div>
		</div>
	);
}
