import { Link, Outlet, useLocation } from 'react-router-dom'

const MenuItem = ({ to, children }) => {
	const loc = useLocation()
	const active = loc.pathname === to
	return (
		<Link
			to={to}
			className={`block px-4 py-2 rounded ${
				active ? 'bg-blue-600' : 'hover:bg-gray-800'
			}`}
		>
			{children}
		</Link>
	)
}

export default function Layout() {
	return (
		<div className='min-h-screen bg-gray-900 text-white flex'>
			<aside className='w-64 bg-gray-800 p-4'>
				<h2 className='text-xl font-bold mb-4'>Fitness Admin</h2>
				<nav className='space-y-2'>
					<MenuItem to='/'>Dashboard</MenuItem>
					<MenuItem to='/clients'>Clients</MenuItem>
					<MenuItem to='/subscription-types'>Subscription Types</MenuItem>
					<MenuItem to='/visits'>Visits</MenuItem>
					<MenuItem to='/stats'>Statistics</MenuItem>
				</nav>
			</aside>

			<div className='flex-1 flex flex-col'>
				<header className='h-16 flex items-center justify-between px-6 bg-gradient-to-b from-transparent to-gray-900 border-b border-gray-800'>
					<div className='text-sm text-gray-300'>Welcome, Manager</div>
					<div className='text-sm text-gray-400'>admin@fitness.local</div>
				</header>

				<main className='flex-1 p-6'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}
