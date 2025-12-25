import axios from 'axios'
import { emit } from './uiEvents'

const base = import.meta.env.VITE_API_BASE || 'http://localhost:3000'
const instance = axios.create({
	baseURL: `${base}/api`,
})

let reqCount = 0
instance.interceptors.request.use(
	config => {
		reqCount += 1
		emit('loading:start')
		return config
	},
	err => {
		emit('loading:stop')
		emit('toast', { type: 'error', message: err.message })
		return Promise.reject(err)
	}
)

instance.interceptors.response.use(
	resp => {
		reqCount = Math.max(0, reqCount - 1)
		if (reqCount === 0) emit('loading:stop')
		return resp
	},
	err => {
		reqCount = Math.max(0, reqCount - 1)
		if (reqCount === 0) emit('loading:stop')
		const message =
			err?.response?.data?.error || err.message || 'Request failed'
		emit('toast', { type: 'error', message })
		return Promise.reject(err)
	}
)

export default instance
