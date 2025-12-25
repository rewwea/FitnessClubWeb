export default function Modal({ title, children, onClose }) {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div className='absolute inset-0 bg-black/60' onClick={onClose} />
			<div className='bg-gray-900 text-white rounded shadow-lg p-6 z-10 w-full max-w-md'>
				<div className='flex justify-between items-center mb-4'>
					<h3 className='text-lg font-semibold'>{title}</h3>
					<button onClick={onClose} className='text-gray-400 hover:text-white'>
						✕
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	)
}
