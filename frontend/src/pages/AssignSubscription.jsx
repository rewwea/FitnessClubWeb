import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import axios from '../utils/axios'

export default function AssignSubscription() {
	const [clients, setClients] = useState([])
	const [types, setTypes] = useState([])
	const [clientId, setClientId] = useState('')
	const [typeId, setTypeId] = useState('')
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const load = async () => {
			try {
				const [cRes, tRes] = await Promise.all([
					axios.get('/clients'),
					axios.get('/subscription-types'),
				])
				setClients(cRes.data || [])
				setTypes(tRes.data || [])
			} catch (err) {
				setError(err?.response?.data?.error || err.message)
			}
		}
		load()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		setError(null)
		setSuccess(null)
		if (!clientId || !typeId) {
			setError('clientId и typeId обязательны')
			return
		}
		try {
			setLoading(true)
			await axios.post('/client-subscriptions', {
				clientId: Number(clientId),
				typeId: Number(typeId),
			})
			setSuccess('Subscription assigned')
			setClientId('')
			setTypeId('')
			setLoading(false)
		} catch (err) {
			setLoading(false)
			setError(err?.response?.data?.error || err.message)
		}
	}

	return (
		<Card className='p-6'>
			<h3 className='text-lg font-semibold mb-4'>Назначить абонемент</h3>

			<form onSubmit={handleSubmit} className='space-y-4 max-w-md'>
				<div>
					<label className='block text-sm text-gray-300 mb-1'>Клиент</label>
					<select
						value={clientId}
						onChange={e => setClientId(e.target.value)}
						required
						className='w-full p-2 bg-gray-900 border border-gray-700 rounded'
					>
						<option value=''>— выберите клиента —</option>
						{clients.map(c => (
							<option key={c.id} value={c.id}>
								{c.firstName} {c.lastName} — {c.phone}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className='block text-sm text-gray-300 mb-1'>
						Тип абонемента
					</label>
					<select
						value={typeId}
						onChange={e => setTypeId(e.target.value)}
						required
						className='w-full p-2 bg-gray-900 border border-gray-700 rounded'
					>
						<option value=''>— выберите тип абонемента —</option>
						{types.map(t => (
							<option key={t.id} value={t.id}>
								{t.name} — {t.durationDays}д — {t.price} ₽
							</option>
						))}
					</select>
				</div>

				{error && <div className='text-red-400'>{error}</div>}
				{success && <div className='text-green-400'>{success}</div>}

				<div className='flex items-center gap-2'>
					<Button type='submit' disabled={loading}>
						{loading ? 'Назначение…' : 'Назначить'}
					</Button>
				</div>
			</form>
		</Card>
	)
}
