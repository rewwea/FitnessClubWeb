export default function Toasts({ toasts, remove }) {
	return (
		<div className='fixed right-4 bottom-4 z-50 flex flex-col gap-2'>
			{toasts.map(t => (
				<div
					key={t.id}
					className={`max-w-sm w-full px-4 py-3 rounded shadow-lg text-sm text-white flex items-start justify-between ${
						t.type === 'error' ? 'bg-red-600' : 'bg-green-600'
					}`}
				>
					<div className='mr-4'>{t.message}</div>
					<button onClick={() => remove(t.id)} className='font-bold'>
						×
					</button>
				</div>
			))}
		</div>
	)
}
