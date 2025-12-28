export default function Button({
	children,
	className = '',
	variant = 'primary',
	...props
}) {
	const base = 'glass-btn ' + className
	return (
		<button {...props} className={base}>
			<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
				{children}
			</span>
		</button>
	)
}
