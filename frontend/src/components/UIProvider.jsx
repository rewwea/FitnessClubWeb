import { useCallback, useEffect, useState } from 'react'
import { on } from '../utils/uiEvents'
import Loader from './Loader'
import Toasts from './Toasts'

let nextId = 1

export default function UIProvider({ children }) {
	const [loading, setLoading] = useState(false)
	const [toasts, setToasts] = useState([])

	useEffect(() => {
		const offStart = on('loading:start', () => setLoading(true))
		const offStop = on('loading:stop', () => setLoading(false))
		const offToast = on('toast', t => {
			const id = nextId++
			setToasts(prev => [
				...prev,
				{ id, type: t.type || 'info', message: t.message || '' },
			])
			setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), 4500)
		})
		return () => {
			offStart()
			offStop()
			offToast()
		}
	}, [])

	const remove = useCallback(
		id => setToasts(prev => prev.filter(t => t.id !== id)),
		[]
	)

	return (
		<>
			{children}
			{loading && <Loader />}
			<Toasts toasts={toasts} remove={remove} />
		</>
	)
}
