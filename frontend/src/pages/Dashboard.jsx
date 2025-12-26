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
				<h1 className='text-3xl font-bold'>Dashboard</h1>
				<div className='flex gap-3'>
					<Button>Create client</Button>
					<Button className='bg-green-500'>Register visit</Button>
				</div>
			</div>

			<div className='grid grid-cols-3 gap-4 mb-6'>
				<Card>
					<div className='text-sm muted'>Total clients</div>
					<div className='text-3xl font-semibold'>{stats.totalClients}</div>
				</Card>

				<Card>
					<div className='text-sm muted'>Active subscriptions</div>
					<div className='text-3xl font-semibold'>
						{stats.activeSubscriptions}
					</div>
				</Card>

				<Card>
					<div className='text-sm muted'>Total visits</div>
					<div className='text-3xl font-semibold'>{stats.totalVisits}</div>
				</Card>
			</div>
		</div>
	)
}
