import * as SecureStore from 'expo-secure-store'
import React, { createContext, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
						user: action.user,
					}
				case 'SIGN_IN':
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
						user: action.user,
					}
				case 'SIGN_OUT':
					return {
						...prevState,
						isSignout: true,
						userToken: null,
						user: null,
					}
				case 'SIGN_UP':
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
						user: action.user,
					}
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
			user: null,
		},
	)

	useEffect(() => {
		const bootstrapAsync = async () => {
			let userToken
			let user
			try {
				const token = await SecureStore.getItemAsync('userToken')
				const userData = await SecureStore.getItemAsync('userData')

				if (token && userData) {
					userToken = token
					user = JSON.parse(userData)
				}
			} catch (e) {
				console.error('Failed to restore session', e)
			}

			dispatch({ type: 'RESTORE_TOKEN', token: userToken, user })
		}

		bootstrapAsync()
	}, [])

	const authContext = React.useMemo(
		() => ({
			signIn: async credentials => {
				try {
					const response = await fetch('http://localhost:3000/api/auth/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(credentials),
					})

					if (!response.ok) {
						const error = await response.json()
						throw new Error(error.error || 'Ошибка входа')
					}

					const data = await response.json()
					const { token, admin } = data

					await SecureStore.setItemAsync('userToken', token)
					await SecureStore.setItemAsync('userData', JSON.stringify(admin))

					dispatch({ type: 'SIGN_IN', token, user: admin })
					return { success: true }
				} catch (error) {
					return { success: false, error: error.message }
				}
			},
			signUp: async userData => {
				try {
					const response = await fetch(
						'http://localhost:3000/api/auth/register',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(userData),
						},
					)

					if (!response.ok) {
						const error = await response.json()
						throw new Error(error.error || 'Ошибка регистрации')
					}

					const data = await response.json()
					const { token, admin } = data

					await SecureStore.setItemAsync('userToken', token)
					await SecureStore.setItemAsync('userData', JSON.stringify(admin))

					dispatch({ type: 'SIGN_UP', token, user: admin })
					return { success: true }
				} catch (error) {
					return { success: false, error: error.message }
				}
			},
			signOut: async () => {
				try {
					await SecureStore.deleteItemAsync('userToken')
					await SecureStore.deleteItemAsync('userData')
					dispatch({ type: 'SIGN_OUT' })
				} catch (error) {
					console.error('Error signing out:', error)
				}
			},
		}),
		[],
	)

	return (
		<AuthContext.Provider value={{ ...state, ...authContext }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
