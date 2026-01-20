import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

// iOS симулятор использует 127.0.0.1, реальное устройство использует IP адрес
// Для локальной сети измените на: 'http://192.168.1.X:3000/api' (где X - ваш IP)
const API_BASE_URL = 'http://127.0.0.1:3000/api'

const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
})

api.interceptors.request.use(
	async config => {
		try {
			const token = await SecureStore.getItemAsync('userToken')
			const userData = await SecureStore.getItemAsync('userData')

			if (token && userData) {
				const user = JSON.parse(userData)
				config.headers['x-admin-id'] = user.id
			}
		} catch (error) {
			console.error('Error setting auth header:', error)
		}

		return config
	},
	error => {
		return Promise.reject(error)
	},
)

api.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			// Handle unauthorized
			SecureStore.deleteItemAsync('userToken')
			SecureStore.deleteItemAsync('userData')
		}
		return Promise.reject(error)
	},
)

export default api
