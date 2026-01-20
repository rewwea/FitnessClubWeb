import { useAuth } from '@/src/context/AuthContext'
import { useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

export default function LoginScreen() {
	const [email, setEmail] = useState('admin@example.com')
	const [password, setPassword] = useState('password123')
	const [loading, setLoading] = useState(false)
	const { signIn } = useAuth()

	const handleLogin = async () => {
		if (!email || !password) {
			Alert.alert('Ошибка', 'Пожалуйста, заполните все поля')
			return
		}

		setLoading(true)
		try {
			const result = await signIn({ email, password })
			if (!result.success) {
				Alert.alert('Ошибка входа', result.error)
			}
		} catch (error) {
			Alert.alert('Ошибка', error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Фитнес Клуб</Text>
				<Text style={styles.subtitle}>Администратор</Text>
			</View>

			<View style={styles.form}>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					placeholder='Введите email'
					value={email}
					onChangeText={setEmail}
					editable={!loading}
					placeholderTextColor='#999'
					keyboardType='email-address'
				/>

				<Text style={styles.label}>Пароль</Text>
				<TextInput
					style={styles.input}
					placeholder='Введите пароль'
					value={password}
					onChangeText={setPassword}
					editable={!loading}
					secureTextEntry
					placeholderTextColor='#999'
				/>

				<TouchableOpacity
					style={[styles.button, loading && styles.buttonDisabled]}
					onPress={handleLogin}
					disabled={loading}
				>
					{loading ? (
						<ActivityIndicator size='small' color='#fff' />
					) : (
						<Text style={styles.buttonText}>Войти</Text>
					)}
				</TouchableOpacity>
			</View>

			<View style={styles.footer}>
				<Text style={styles.footerText}>Демо учетные данные:</Text>
				<Text style={styles.footerText}>Email: admin@example.com</Text>
				<Text style={styles.footerText}>Пароль: password123</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		paddingVertical: 40,
	},
	header: {
		alignItems: 'center',
		marginTop: 40,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: '#999',
	},
	form: {
		flex: 1,
		justifyContent: 'center',
	},
	label: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 8,
		color: '#333',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		marginBottom: 20,
		backgroundColor: '#fff',
		fontSize: 16,
	},
	button: {
		backgroundColor: '#007AFF',
		paddingVertical: 14,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 10,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	footer: {
		backgroundColor: '#e8f4fd',
		padding: 16,
		borderRadius: 8,
		marginBottom: 20,
	},
	footerText: {
		fontSize: 12,
		color: '#0066cc',
		marginBottom: 4,
	},
})
