export default function Toasts({ toasts, remove }) {
	return (
		<div className='toasts-container fixed right-4 bottom-4 z-50 flex flex-col gap-3'>
			{toasts.map(t => (
				<div
					role='status'
					aria-live='polite'
					key={t.id}
					className={`toast-enter max-w-sm w-full px-4 py-3 rounded shadow-lg text-sm text-white flex items-start justify-between ${
						t.type === 'error' ? 'bg-red-600' : 'bg-green-600'
					}`}
				>
					<div className='mr-4 flex-1'>{t.message}</div>
					<button
						onClick={() => remove(t.id)}
						className='font-bold opacity-90 hover:opacity-100'
					>
						×
					</button>
				</div>
			))}
		</div>
	)
}
