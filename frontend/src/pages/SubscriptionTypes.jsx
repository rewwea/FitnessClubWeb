import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Button from '../components/Button'
import Card from '../components/Card'
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
		<div className='space-y-4'>
			<div className='flex items-center justify-between mb-4'>
				<div>
					<h1 className='text-2xl font-bold'>Типы абонементов</h1>
					<div className='text-sm muted'>Управление типами абонементов</div>
				</div>
				<Button onClick={() => setOpen(true)}>Создать тип</Button>
			</div>

			<Card>
				<div className='overflow-auto'>
					<table className='modern-table'>
						<thead>
							<tr>
								<th>Название</th>
								<th>Длительность</th>
								<th>Цена</th>
							</tr>
						</thead>
						<tbody>
							{types.map(t => (
								<tr key={t.id}>
									<td>{t.name}</td>
									<td>{t.durationDays} д</td>
									<td>{t.price} ₽</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Card>

			{open && (
				<Modal title='Создать тип абонемента' onClose={() => setOpen(false)}>
					<form onSubmit={handleSubmit(create)} className='space-y-3'>
						<div>
							<input
								{...register('name')}
								placeholder='Название'
								className='w-full p-2 border rounded bg-transparent'
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
								placeholder='Дней'
								className='w-full p-2 border rounded bg-transparent'
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
								placeholder='Цена в ₽'
								className='w-full p-2 border rounded bg-transparent'
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
								Отмена
							</button>
							<Button type='submit'>Создать</Button>
						</div>
					</form>
				</Modal>
			)}
		</div>
	)
}
