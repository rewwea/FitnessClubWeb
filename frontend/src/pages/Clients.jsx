import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Button from '../components/Button'
import Card from '../components/Card'
import Modal from '../components/Modal'
import axios from '../utils/axios'

export default function Clients() {
	const [clients, setClients] = useState([])
	const [selectedClient, setSelectedClient] = useState(null)
	const [clientSubs, setClientSubs] = useState([])
	const [types, setTypes] = useState([])
	const [assignOpen, setAssignOpen] = useState(false)
	const [freezeOpenFor, setFreezeOpenFor] = useState(null)
	const [assignTypeId, setAssignTypeId] = useState('')
	const [freezeForm, setFreezeForm] = useState({ startDate: '', endDate: '' })
	const [trainers, setTrainers] = useState([])
	const [openCreate, setOpenCreate] = useState(false)

	const createSchema = z.object({
		firstName: z.string().min(1, 'Required'),
		lastName: z.string().min(1, 'Required'),
		email: z.string().email('Invalid email'),
		phone: z.string().optional(),
		trainerId: z.string().optional(),
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(createSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			trainerId: '',
		},
	})

	useEffect(() => {
		load()
	}, [])
	const load = async () => {
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
		try {
			const tt = await axios.get('/subscription-types')
			setTypes(tt.data)
		} catch (e) {
			setTypes([])
		}
	}

	const create = async data => {
		try {
			// convert trainerId to number or undefined
			const payload = { ...data }
			if (payload.trainerId === '') delete payload.trainerId
			else payload.trainerId = Number(payload.trainerId)

			await axios.post('/clients', payload)
			setOpenCreate(false)
			reset()
			load()
		} catch (e) {
			alert(e?.response?.data?.error || e.message || 'Error')
		}
	}

	const openDetails = async client => {
		setSelectedClient(client)
		try {
			const r = await axios.get(`/client-subscriptions/client/${client.id}`)
			setClientSubs(r.data)
		} catch (e) {
			setClientSubs([])
		}
	}

	const assignSubscription = async () => {
		if (!assignTypeId) return alert('Choose type')
		try {
			await axios.post('/client-subscriptions', {
				clientId: selectedClient.id,
				typeId: Number(assignTypeId),
			})
			setAssignOpen(false)
			const r = await axios.get(
				`/client-subscriptions/client/${selectedClient.id}`
			)
			setClientSubs(r.data)
		} catch (e) {
			alert(e?.response?.data?.error || 'Error')
		}
	}

	const freezeSubscription = async subId => {
		if (!freezeForm.startDate || !freezeForm.endDate)
			return alert('Dates required')
		try {
			await axios.post('/subscription-freeze', {
				clientSubscriptionId: subId,
				startDate: freezeForm.startDate,
				endDate: freezeForm.endDate,
			})
			setFreezeOpenFor(null)
			const r = await axios.get(
				`/client-subscriptions/client/${selectedClient.id}`
			)
			setClientSubs(r.data)
		} catch (e) {
			alert(e?.response?.data?.error || 'Error')
		}
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between mb-2'>
				<h1 className='text-2xl font-bold'>Clients</h1>
				<div>
					<Button onClick={() => setOpenCreate(true)}>Create client</Button>
				</div>
			</div>

			<Card className='overflow-auto'>
				<table className='min-w-full'>
					<thead className='bg-gray-700'>
						<tr>
							<th className='p-3 text-left'>ID</th>
							<th className='p-3 text-left'>Name</th>
							<th className='p-3 text-left'>Email</th>
							<th className='p-3 text-left'>Phone</th>
							<th className='p-3 text-left'>Trainer</th>
						</tr>
					</thead>
					<tbody>
						{clients.map(c => (
							<tr
								key={c.id}
								className='border-t border-gray-700 hover:bg-gray-800 cursor-pointer'
								onClick={() => openDetails(c)}
							>
								<td className='p-3'>{c.id}</td>
								<td className='p-3'>
									{c.firstName} {c.lastName}
								</td>
								<td className='p-3'>{c.email}</td>
								<td className='p-3'>{c.phone}</td>
								<td className='p-3'>{c.trainerId ? 'Assigned' : '—'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Card>

			{openCreate && (
				<Modal title='Create client' onClose={() => setOpenCreate(false)}>
					<form onSubmit={handleSubmit(create)} className='space-y-2'>
						<div>
							<input
								{...register('firstName')}
								placeholder='First name'
								className='w-full p-2 border rounded'
							/>
							{errors.firstName && (
								<div className='text-sm text-red-500'>
									{errors.firstName.message}
								</div>
							)}
						</div>
						<div>
							<input
								{...register('lastName')}
								placeholder='Last name'
								className='w-full p-2 border rounded'
							/>
							{errors.lastName && (
								<div className='text-sm text-red-500'>
									{errors.lastName.message}
								</div>
							)}
						</div>
						<div>
							<input
								{...register('email')}
								placeholder='Email'
								className='w-full p-2 border rounded'
							/>
							{errors.email && (
								<div className='text-sm text-red-500'>
									{errors.email.message}
								</div>
							)}
						</div>
						<div>
							<input
								{...register('phone')}
								placeholder='Phone'
								className='w-full p-2 border rounded'
							/>
						</div>
						<div>
							<select
								{...register('trainerId')}
								className='w-full p-2 border rounded'
							>
								<option value=''>No trainer</option>
								{trainers.map(t => (
									<option key={t.id} value={t.id}>
										{t.firstName} {t.lastName}
									</option>
								))}
							</select>
						</div>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() => setOpenCreate(false)}
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

			{selectedClient && (
				<Modal
					title={`Client: ${selectedClient.firstName} ${selectedClient.lastName}`}
					onClose={() => setSelectedClient(null)}
				>
					<div className='space-y-3'>
						<div>ID: {selectedClient.id}</div>
						<div>Email: {selectedClient.email}</div>
						<div>Phone: {selectedClient.phone}</div>

						<div>
							<h4 className='font-semibold mt-2'>Subscriptions</h4>
							{clientSubs.length === 0 && (
								<div className='text-sm text-gray-400'>No subscriptions</div>
							)}
							{clientSubs.map(s => (
								<div key={s.id} className='p-2 bg-gray-800 rounded my-2'>
									<div>Type: {s.type.name}</div>
									<div>Start: {new Date(s.startDate).toLocaleDateString()}</div>
									<div>End: {new Date(s.endDate).toLocaleDateString()}</div>
									<div className='mt-2 flex gap-2'>
										<button
											onClick={() => {
												setAssignOpen(true)
												setAssignTypeId('')
											}}
											className='px-2 py-1 bg-blue-600 rounded text-sm'
										>
											Assign new
										</button>
										<button
											onClick={() => setFreezeOpenFor(s.id)}
											className='px-2 py-1 bg-yellow-600 rounded text-sm'
										>
											Freeze
										</button>
									</div>
									{freezeOpenFor === s.id && (
										<div className='mt-2'>
											<input
												type='date'
												value={freezeForm.startDate}
												onChange={e =>
													setFreezeForm({
														...freezeForm,
														startDate: e.target.value,
													})
												}
												className='p-1 mr-2'
											/>
											<input
												type='date'
												value={freezeForm.endDate}
												onChange={e =>
													setFreezeForm({
														...freezeForm,
														endDate: e.target.value,
													})
												}
												className='p-1 mr-2'
											/>
											<button
												onClick={() => freezeSubscription(s.id)}
												className='px-2 py-1 bg-green-600 rounded text-sm'
											>
												Apply
											</button>
										</div>
									)}
								</div>
							))}
						</div>

						<div className='flex justify-end'>
							<button
								onClick={() => setSelectedClient(null)}
								className='px-3 py-2'
							>
								Close
							</button>
						</div>
					</div>
				</Modal>
			)}

			{assignOpen && selectedClient && (
				<Modal title='Assign subscription' onClose={() => setAssignOpen(false)}>
					<div className='space-y-2'>
						<select
							value={assignTypeId}
							onChange={e => setAssignTypeId(e.target.value)}
							className='w-full p-2 border rounded'
						>
							<option value=''>Select type</option>
							{types.map(t => (
								<option key={t.id} value={t.id}>
									{t.name} — {t.durationDays}d — {t.price}
								</option>
							))}
						</select>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() => setAssignOpen(false)}
								className='px-3 py-2'
							>
								Cancel
							</button>
							<button
								onClick={assignSubscription}
								className='px-3 py-2 bg-blue-600 rounded'
							>
								Assign
							</button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	)
}
