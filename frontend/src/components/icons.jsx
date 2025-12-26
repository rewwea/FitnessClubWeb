export function SearchIcon({ className = 'w-4 h-4' }) {
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<circle cx='11' cy='11' r='7' />
			<line x1='21' y1='21' x2='16.65' y2='16.65' />
		</svg>
	)
}

export function UserIcon({ className = 'w-5 h-5' }) {
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M20 21v-2a4 4 0 0 0-3-3.87' />
			<path d='M4 21v-2a4 4 0 0 1 3-3.87' />
			<circle cx='12' cy='7' r='4' />
		</svg>
	)
}

export function PlusIcon({ className = 'w-4 h-4' }) {
	return (
		<svg
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<line x1='12' y1='5' x2='12' y2='19' />
			<line x1='5' y1='12' x2='19' y2='12' />
		</svg>
	)
}
