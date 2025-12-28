import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import axios from '../utils/axios'

export default function Dashboard() {
	const [stats, setStats] = useState({
		totalClients: 0,
		activeSubscriptions: 0,
		totalVisits: 0,
	})

	useEffect(() => {
		const load = async () => {
			try {
				const resp = await axios.get('/stats/summary')
				setStats(resp.data)
			} catch (e) {
				// ignore
			}
		}
		load()
	}, [])

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold'>Панель управления</h1>
					<div className='text-sm muted'>Общая статистика клуба</div>
				</div>

				<div className='flex gap-3'>
					<Button>Создать клиента</Button>
					<Button className='bg-green-500'>Зарегистрировать посещение</Button>
				</div>
			</div>

			<div className='grid grid-cols-3 gap-6 mb-6'>
				<Card className='p-6'>
					<div className='text-sm muted'>Клиентов всего</div>
					<div className='text-3xl font-semibold mt-2'>
						{stats.totalClients}
					</div>
				</Card>

				<Card className='p-6'>
					<div className='text-sm muted'>Активных абонементов</div>
					<div className='text-3xl font-semibold mt-2'>
						{stats.activeSubscriptions}
					</div>
				</Card>

				<Card className='p-6'>
					<div className='text-sm muted'>Посещений</div>
					<div className='text-3xl font-semibold mt-2'>{stats.totalVisits}</div>
				</Card>
			</div>
		</div>
	)
}
