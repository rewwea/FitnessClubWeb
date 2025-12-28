export default function Modal({ title, children, onClose }) {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div className='absolute inset-0 bg-black/60' onClick={onClose} />
			<div className='ui-modal z-10 w-full max-w-2xl text-white'>
				<div className='flex justify-between items-center mb-4'>
					<h3 className='text-xl font-semibold'>{title}</h3>
					<button
						onClick={onClose}
						className='w-9 h-9 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/30'
						aria-label='close'
					>
						<svg
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line x1='18' y1='6' x2='6' y2='18'></line>
							<line x1='6' y1='6' x2='18' y2='18'></line>
						</svg>
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	)
}
