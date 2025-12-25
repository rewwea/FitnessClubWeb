import { useEffect, useState } from 'react'
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
		<div>
			<h1 className='text-2xl font-bold mb-4'>Dashboard</h1>

			<div className='grid grid-cols-3 gap-4 mb-6'>
				<div className='p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded'>
					<div className='text-sm text-gray-300'>Total clients</div>
					<div className='text-2xl font-semibold'>{stats.totalClients}</div>
				</div>

				<div className='p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded'>
					<div className='text-sm text-gray-300'>Active subscriptions</div>
					<div className='text-2xl font-semibold'>
						{stats.activeSubscriptions}
					</div>
				</div>

				<div className='p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded'>
					<div className='text-sm text-gray-300'>Total visits</div>
					<div className='text-2xl font-semibold'>{stats.totalVisits}</div>
				</div>
			</div>

			<div className='flex gap-3'>
				<button className='px-4 py-2 bg-blue-600 rounded'>Create client</button>
				<button className='px-4 py-2 bg-green-600 rounded'>
					Register visit
				</button>
			</div>
		</div>
	)
}
