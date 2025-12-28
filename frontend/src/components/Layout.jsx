import { Link, Outlet, useLocation } from 'react-router-dom'

const MenuItem = ({ to, children }) => {
	const loc = useLocation()
	const path = loc.pathname
	const active = to === '/' ? path === '/' : path.startsWith(to)
	const label = typeof children === 'string' ? children : ''
	const initial = label ? label.trim().charAt(0).toUpperCase() : '•'

	return (
		<Link
			to={to}
			className={`nav-item ${active ? 'nav-item-active' : 'nav-item-inactive'}`}
		>
			<div className='nav-badge' aria-hidden>
				{initial}
			</div>
			<div className='nav-label'>{children}</div>
		</Link>
	)
}

export default function Layout() {
	return (
		<div className='min-h-screen flex'>
			<aside className='w-72 p-6 sidebar'>
				<div className='logo mb-6'>
					<div className='dot' />
					<div>
						<div style={{ fontSize: 18 }}>Fitness</div>
						<div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
							Admin
						</div>
					</div>
				</div>

				<nav className='space-y-3'>
					<MenuItem to='/'>Панель</MenuItem>
					<MenuItem to='/clients'>Клиенты</MenuItem>
					<MenuItem to='/assign-subscription'>Назначить абонемент</MenuItem>
					<MenuItem to='/subscription-types'>Типы абонементов</MenuItem>
					<MenuItem to='/visits'>Посещения</MenuItem>
					<MenuItem to='/stats'>Статистика</MenuItem>
				</nav>
			</aside>

			<div className='flex-1 flex flex-col bg-transparent'>
				<header className='h-16 flex items-center justify-between px-8 border-b border-white/3'>
					<div className='text-sm text-gray-300'>
						Добро пожаловать, Менеджер
					</div>
					<div className='text-sm text-gray-400'>admin@fitness.local</div>
				</header>

				<main className='flex-1 p-8 container'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}
