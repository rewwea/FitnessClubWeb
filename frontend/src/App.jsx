import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AssignSubscription from './pages/AssignSubscription'
import Clients from './pages/Clients'
import Dashboard from './pages/Dashboard'
import Stats from './pages/Stats'
import SubscriptionTypes from './pages/SubscriptionTypes'
import Visits from './pages/Visits'

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path='clients' element={<Clients />} />
					<Route path='assign-subscription' element={<AssignSubscription />} />
					<Route path='subscription-types' element={<SubscriptionTypes />} />
					<Route path='visits' element={<Visits />} />
					<Route path='stats' element={<Stats />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
