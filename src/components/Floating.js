import classNames from 'classnames';

export default function Floating({ top, right, bottom, left, onBlur, children }) {
	const triangleClass = classNames('Floating-triangle', {
		'Floating-triangle--top': top,
		'Floating-triangle--bottom': bottom,
	});
	const contentClass = classNames('Floating-content', {
		'Floating-content--top': top,
		'Floating-content--right': right,
		'Floating-content--bottom': bottom,
		'Floating-content--left': left,
	});
	return (
		<div className="Floating">
			<div className="Floating-overlay" onClick={onBlur}/>
			<div className={contentClass}>
				{children}
			</div>
			<div className={triangleClass}/>
		</div>
	);
}
