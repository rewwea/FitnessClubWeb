import { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from '../utils/axios'

function Sparkline({ points = [] }) {
	if (!points.length) return null
	const w = 340
	const h = 80
	const max = Math.max(...points.map(p => p.count))
	const min = Math.min(...points.map(p => p.count))
	const range = Math.max(1, max - min)
	const step = w / Math.max(1, points.length - 1)
	const path = points
		.map((p, i) => {
			const x = i * step
			const y = h - ((p.count - min) / range) * (h - 8) - 4
			return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
		})
		.join(' ')

	return (
		<svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
			<path
				d={path}
				fill='none'
				stroke='url(#g)'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<defs>
				<linearGradient id='g' x1='0' x2='1'>
					<stop offset='0%' stopColor='#7c3aed' />
					<stop offset='100%' stopColor='#06b6d4' />
				</linearGradient>
			</defs>
		</svg>
	)
}

export default function Stats() {
	const [summary, setSummary] = useState(null)
	const [visits, setVisits] = useState([])
	const [topClients, setTopClients] = useState([])
	const [expiring, setExpiring] = useState([])
	const [clientsMap, setClientsMap] = useState({})

	useEffect(() => {
		const load = async () => {
			try {
				const [sRes, vRes, tRes, eRes, cRes] = await Promise.all([
					axios.get('/stats/summary'),
					axios.get('/stats/visits-by-days?days=14'),
					axios.get('/stats/top-clients?limit=5'),
					axios.get('/stats/subscriptions-expiring?days=14'),
					axios.get('/clients'),
				])
				setSummary(sRes.data)
				setVisits(vRes.data || [])
				setTopClients(tRes.data || [])
				setExpiring(eRes.data || [])
				const map = {}(cRes.data || []).forEach(c => (map[c.id] = c))
				setClientsMap(map)
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
					<h1 className='text-2xl font-bold'>Статистика</h1>
					<div className='text-sm muted'>Ключевые метрики и тренды</div>
				</div>
			</div>

			{summary && (
				<div className='grid grid-cols-4 gap-4'>
					<Card className='p-4'>
						<div className='text-sm muted'>Клиентов всего</div>
						<div className='text-2xl font-semibold'>{summary.totalClients}</div>
					</Card>
					<Card className='p-4'>
						<div className='text-sm muted'>Активных клиентов</div>
						<div className='text-2xl font-semibold'>
							{summary.activeClients}
						</div>
					</Card>
					<Card className='p-4'>
						<div className='text-sm muted'>Активных абонементов</div>
						<div className='text-2xl font-semibold'>
							{summary.activeSubscriptions}
						</div>
					</Card>
					<Card className='p-4'>
						<div className='text-sm muted'>Всего посещений</div>
						<div className='text-2xl font-semibold'>{summary.totalVisits}</div>
					</Card>
				</div>
			)}

			<div className='grid grid-cols-3 gap-4'>
				<Card className='p-4'>
					<div className='text-sm muted'>Посещения (последние 14 дней)</div>
					<div className='mt-3'>
						<Sparkline points={visits} />
					</div>
				</Card>

				<Card className='p-4'>
					<div className='text-sm muted'>Топ клиентов (по визитам)</div>
					<div className='mt-3'>
						<table className='modern-table'>
							<thead>
								<tr>
									<th>Клиент</th>
									<th>Визитов</th>
								</tr>
							</thead>
							<tbody>
								{topClients.map(tc => (
									<tr key={tc.clientId}>
										<td>
											{clientsMap[tc.clientId]
												? `${clientsMap[tc.clientId].firstName} ${
														clientsMap[tc.clientId].lastName
												  }`
												: `#${tc.clientId}`}
										</td>
										<td>{tc.visitsCount}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Card>

				<Card className='p-4'>
					<div className='text-sm muted'>Скоро истекают</div>
					<div className='mt-3'>
						<table className='modern-table'>
							<thead>
								<tr>
									<th>Клиент</th>
									<th>Окончание</th>
								</tr>
							</thead>
							<tbody>
								{expiring.map(s => (
									<tr key={s.id}>
										<td>{s.clientName || `#${s.clientId}`}</td>
										<td>{new Date(s.endDate).toLocaleDateString()}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Card>
			</div>
		</div>
	)
}
