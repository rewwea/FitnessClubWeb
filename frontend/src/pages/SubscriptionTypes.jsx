import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Modal from '../components/Modal'
import axios from '../utils/axios'

export default function SubscriptionTypes() {
	const [types, setTypes] = useState([])
	const [open, setOpen] = useState(false)

	const typeSchema = z.object({
		name: z.string().min(1, 'Required'),
		durationDays: z.number().min(1, 'Must be > 0'),
		price: z.number().min(0, 'Must be >= 0'),
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(typeSchema),
		defaultValues: { name: '', durationDays: 30, price: 0 },
	})

	useEffect(() => {
		load()
	}, [])
	const load = async () => {
		try {
			const r = await axios.get('/subscription-types')
			setTypes(r.data)
		} catch (e) {
			setTypes([])
		}
	}

	const create = async data => {
		try {
			await axios.post('/subscription-types', data)
			setOpen(false)
			reset()
			load()
		} catch (e) {
			alert(e?.response?.data?.error || e.message || 'Error')
		}
	}

	return (
		<div>
			<div className='flex items-center justify-between mb-4'>
				<h1 className='text-2xl font-bold'>Subscription Types</h1>
				<button
					onClick={() => setOpen(true)}
					className='px-3 py-2 bg-blue-600 rounded'
				>
					Create
				</button>
			</div>

			<div className='bg-gray-800 rounded p-2'>
				{types.map(t => (
					<div
						key={t.id}
						className='p-2 border-b border-gray-700 flex justify-between'
					>
						<div>
							{t.name} — {t.durationDays} days — {t.price}
						</div>
					</div>
				))}
			</div>

			{open && (
				<Modal title='Create subscription type' onClose={() => setOpen(false)}>
					<form onSubmit={handleSubmit(create)} className='space-y-2'>
						<div>
							<input
								{...register('name')}
								placeholder='Name'
								className='w-full p-2 border rounded'
							/>
							{errors.name && (
								<div className='text-sm text-red-500'>
									{errors.name.message}
								</div>
							)}
						</div>
						<div>
							<input
								type='number'
								{...register('durationDays', { valueAsNumber: true })}
								placeholder='Duration days'
								className='w-full p-2 border rounded'
							/>
							{errors.durationDays && (
								<div className='text-sm text-red-500'>
									{errors.durationDays.message}
								</div>
							)}
						</div>
						<div>
							<input
								type='number'
								{...register('price', { valueAsNumber: true })}
								placeholder='Price'
								className='w-full p-2 border rounded'
							/>
							{errors.price && (
								<div className='text-sm text-red-500'>
									{errors.price.message}
								</div>
							)}
						</div>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() => setOpen(false)}
								type='button'
								className='px-3 py-2'
							>
								Cancel
							</button>
							<button type='submit' className='px-3 py-2 bg-blue-600 rounded'>
								Create
							</button>
						</div>
					</form>
				</Modal>
			)}
		</div>
	)
}
