export default function Card({ children, className = '' }) {
	return <div className={`modern-card ${className}`}>{children}</div>
}
