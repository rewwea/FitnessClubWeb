import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Button from '../components/Button'
import Card from '../components/Card'
import Modal from '../components/Modal'
import axios from '../utils/axios'

export default function Visits() {
	const [open, setOpen] = useState(false)
	const [clients, setClients] = useState([])
	const [form, setForm] = useState({ clientId: '', trainerId: '' })
	const [trainers, setTrainers] = useState([])

	const visitSchema = z.object({
		clientId: z.string().min(1, 'Client required'),
		trainerId: z.string().optional(),
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(visitSchema),
		defaultValues: { clientId: '', trainerId: '' },
	})

	useEffect(() => {
		loadClients()
	}, [])
	const loadClients = async () => {
		try {
			const r = await axios.get('/clients')
			setClients(r.data)
		} catch (e) {
			setClients([])
		}
		try {
			const t = await axios.get('/trainers')
			setTrainers(t.data)
		} catch (e) {
			setTrainers([])
		}
	}

	const create = async data => {
		try {
			const payload = { clientId: Number(data.clientId) }
			if (data.trainerId) payload.trainerId = Number(data.trainerId)
			await axios.post('/visits', payload)
			setOpen(false)
			reset()
			setForm({ clientId: '', trainerId: '' })
			alert('Visit created')
		} catch (e) {
			alert(e?.response?.data?.error || 'Error')
		}
	}

	const [selectedClientVisits, setSelectedClientVisits] = useState([])
	const loadVisitsForClient = async clientId => {
		if (!clientId) return setSelectedClientVisits([])
		try {
			const r = await axios.get(`/visits/client/${clientId}`)
			setSelectedClientVisits(r.data)
		} catch (e) {
			setSelectedClientVisits([])
		}
	}

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between mb-4'>
				<div>
					<h1 className='text-2xl font-bold'>Посещения</h1>
					<div className='text-sm muted'>Регистрация и история посещений</div>
				</div>
				<Button onClick={() => setOpen(true)}>
					Зарегистрировать посещение
				</Button>
			</div>

			<div>
				<label className='block text-sm text-gray-400 mb-2'>
					Выберите клиента
				</label>
				<select
					onChange={e => loadVisitsForClient(e.target.value)}
					className='p-2 bg-gray-900 rounded w-64'
				>
					<option value=''>-- выбрать клиента --</option>
					{clients.map(c => (
						<option key={c.id} value={c.id}>
							{c.firstName} {c.lastName}
						</option>
					))}
				</select>
			</div>

			{selectedClientVisits.length > 0 && (
				<Card>
					<h3 className='font-semibold mb-2'>История посещений</h3>
					<ul className='space-y-2'>
						{selectedClientVisits.map(v => (
							<li key={v.id} className='text-sm text-gray-300'>
								{new Date(v.visitDate).toLocaleString()} — тренер:{' '}
								{v.trainerId ?? '—'}
							</li>
						))}
					</ul>
				</Card>
			)}

			{open && (
				<Modal
					title='Зарегистрировать посещение'
					onClose={() => setOpen(false)}
				>
					<form onSubmit={handleSubmit(create)} className='space-y-3'>
						<select
							{...register('clientId')}
							className='w-full p-2 border rounded bg-transparent'
						>
							<option value=''>Выберите клиента</option>
							{clients.map(c => (
								<option key={c.id} value={c.id}>
									{c.firstName} {c.lastName}
								</option>
							))}
						</select>
						{errors.clientId && (
							<div className='text-sm text-red-400'>
								{errors.clientId.message}
							</div>
						)}

						<select
							{...register('trainerId')}
							className='w-full p-2 border rounded bg-transparent'
						>
							<option value=''>Без тренера</option>
							{trainers.map(t => (
								<option key={t.id} value={t.id}>
									{t.firstName} {t.lastName}
								</option>
							))}
						</select>

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
