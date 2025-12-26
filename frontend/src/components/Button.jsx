export default function Button({ children, className = '', ...props }) {
	return (
		<button {...props} className={'glass-btn ' + className}>
			{children}
		</button>
	)
}
