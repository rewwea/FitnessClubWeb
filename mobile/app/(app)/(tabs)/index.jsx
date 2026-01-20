import api from '@/src/utils/api'
import { FontAwesome } from '@expo/vector-icons'
import { useFocusEffect, useRouter } from 'expo-router'
import React from 'react'
import {
	ActivityIndicator,
	Alert,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

export default function DashboardScreen() {
	const router = useRouter()
	const [stats, setStats] = React.useState(null)
	const [loading, setLoading] = React.useState(true)
	const [showAddClientModal, setShowAddClientModal] = React.useState(false)
	const [showAddVisitModal, setShowAddVisitModal] = React.useState(false)
	const [clients, setClients] = React.useState([])
	const [formData, setFormData] = React.useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	})

	useFocusEffect(
		React.useCallback(() => {
			loadStats()
			loadClients()
		}, []),
	)

	const loadStats = async () => {
		try {
			const response = await api.get('/stats/summary')
			setStats(response.data)
		} catch (error) {
			console.error('Error loading stats:', error)
		}
	}

	const loadClients = async () => {
		try {
			const response = await api.get('/clients')
			setClients(response.data)
		} catch (error) {
			console.error('Error loading clients:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleAddClient = async () => {
		if (!formData.firstName || !formData.email || !formData.phone) {
			Alert.alert('Ошибка', 'Заполните все поля')
			return
		}

		try {
			await api.post('/clients', {
				...formData,
				birthDate: new Date().toISOString().split('T')[0],
			})
			Alert.alert('Успешно', 'Клиент добавлен')
			setFormData({ firstName: '', lastName: '', email: '', phone: '' })
			setShowAddClientModal(false)
			loadStats()
			loadClients()
		} catch (error) {
			Alert.alert(
				'Ошибка',
				error.response?.data?.message || 'Не удалось добавить клиента',
			)
		}
	}

	const handleAddVisit = async () => {
		if (clients.length === 0) {
			Alert.alert('Ошибка', 'Нет клиентов в системе')
			return
		}

		const clientId = clients[0]?.id
		try {
			await api.post('/visits', {
				clientId,
				visitDate: new Date().toISOString(),
			})
			Alert.alert('Успешно', `Посещение отмечено для ${clients[0].firstName}`)
			setShowAddVisitModal(false)
			loadStats()
		} catch (error) {
			Alert.alert(
				'Ошибка',
				error.response?.data?.message || 'Не удалось отметить посещение',
			)
		}
	}

	if (loading) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size='large' color='#007AFF' />
			</View>
		)
	}

	return (
		<>
			<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
				<View style={styles.welcomeSection}>
					<Text style={styles.welcomeText}>Добро пожаловать!</Text>
					<Text style={styles.welcomeSubtext}>Управление фитнес-клубом</Text>
				</View>

				<View style={styles.statsGrid}>
					<View style={styles.statCard}>
						<View
							style={[styles.statIconContainer, { backgroundColor: '#e3f2fd' }]}
						>
							<FontAwesome name='users' size={32} color='#007AFF' />
						</View>
						<Text style={styles.statValue}>{stats?.totalClients || 0}</Text>
						<Text style={styles.statLabel}>Клиентов</Text>
					</View>

					<View style={styles.statCard}>
						<View
							style={[styles.statIconContainer, { backgroundColor: '#f3e5f5' }]}
						>
							<FontAwesome name='check-circle' size={32} color='#9c27b0' />
						</View>
						<Text style={styles.statValue}>
							{stats?.activeSubscriptions || 0}
						</Text>
						<Text style={styles.statLabel}>Активные абонементы</Text>
					</View>

					<View style={styles.statCard}>
						<View
							style={[styles.statIconContainer, { backgroundColor: '#e8f5e9' }]}
						>
							<FontAwesome name='calendar' size={32} color='#4caf50' />
						</View>
						<Text style={styles.statValue}>{stats?.visits || 0}</Text>
						<Text style={styles.statLabel}>Посещений</Text>
					</View>
				</View>

				<View style={styles.quickActionsSection}>
					<Text style={styles.sectionTitle}>Быстрые действия</Text>

					<TouchableOpacity
						style={styles.actionButton}
						onPress={() => router.push('/(app)/(tabs)/clients')}
					>
						<FontAwesome name='users' size={24} color='#007AFF' />
						<Text style={styles.actionButtonText}>Список клиентов</Text>
						<FontAwesome name='chevron-right' size={20} color='#999' />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.actionButton}
						onPress={() => setShowAddClientModal(true)}
					>
						<FontAwesome name='user-plus' size={24} color='#4caf50' />
						<Text style={styles.actionButtonText}>Добавить клиента</Text>
						<FontAwesome name='chevron-right' size={20} color='#999' />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.actionButton}
						onPress={() => setShowAddVisitModal(true)}
					>
						<FontAwesome name='check-square' size={24} color='#ff9800' />
						<Text style={styles.actionButtonText}>Отметить посещение</Text>
						<FontAwesome name='chevron-right' size={20} color='#999' />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.actionButton}
						onPress={() => router.push('/(app)/subscriptions')}
					>
						<FontAwesome name='ticket' size={24} color='#9c27b0' />
						<Text style={styles.actionButtonText}>Управление абонементами</Text>
						<FontAwesome name='chevron-right' size={20} color='#999' />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.actionButton}
						onPress={() => router.push('/(app)/(tabs)/stats')}
					>
						<FontAwesome name='bar-chart' size={24} color='#007AFF' />
						<Text style={styles.actionButtonText}>Статистика</Text>
						<FontAwesome name='chevron-right' size={20} color='#999' />
					</TouchableOpacity>
				</View>
			</ScrollView>

			{/* Модаль добавления клиента */}
			<Modal
				visible={showAddClientModal}
				animationType='slide'
				transparent
				onRequestClose={() => setShowAddClientModal(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Добавить клиента</Text>
							<TouchableOpacity onPress={() => setShowAddClientModal(false)}>
								<FontAwesome name='times' size={24} color='#333' />
							</TouchableOpacity>
						</View>

						<ScrollView style={styles.modalBody}>
							<Text style={styles.inputLabel}>Имя *</Text>
							<TextInput
								style={styles.input}
								placeholder='Введите имя'
								value={formData.firstName}
								onChangeText={text =>
									setFormData({ ...formData, firstName: text })
								}
							/>

							<Text style={styles.inputLabel}>Фамилия</Text>
							<TextInput
								style={styles.input}
								placeholder='Введите фамилию'
								value={formData.lastName}
								onChangeText={text =>
									setFormData({ ...formData, lastName: text })
								}
							/>

							<Text style={styles.inputLabel}>Email *</Text>
							<TextInput
								style={styles.input}
								placeholder='Введите email'
								value={formData.email}
								onChangeText={text => setFormData({ ...formData, email: text })}
								keyboardType='email-address'
							/>

							<Text style={styles.inputLabel}>Телефон *</Text>
							<TextInput
								style={styles.input}
								placeholder='Введите телефон'
								value={formData.phone}
								onChangeText={text => setFormData({ ...formData, phone: text })}
								keyboardType='phone-pad'
							/>
						</ScrollView>

						<View style={styles.modalFooter}>
							<TouchableOpacity
								style={[styles.button, { flex: 1, marginRight: 8 }]}
								onPress={() => setShowAddClientModal(false)}
							>
								<Text style={styles.buttonText}>Отменить</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.buttonSuccess, { flex: 1 }]}
								onPress={handleAddClient}
							>
								<Text style={styles.buttonText}>Добавить</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			{/* Модаль отметки посещения */}
			<Modal
				visible={showAddVisitModal}
				animationType='slide'
				transparent
				onRequestClose={() => setShowAddVisitModal(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Отметить посещение</Text>
							<TouchableOpacity onPress={() => setShowAddVisitModal(false)}>
								<FontAwesome name='times' size={24} color='#333' />
							</TouchableOpacity>
						</View>

						<View style={styles.modalBody}>
							<Text style={styles.infoText}>
								Посещение будет отмечено для первого клиента в системе:
							</Text>
							{clients.length > 0 && (
								<View style={styles.clientInfo}>
									<FontAwesome name='user' size={32} color='#007AFF' />
									<View style={{ marginLeft: 16 }}>
										<Text style={styles.clientName}>
											{clients[0].firstName} {clients[0].lastName}
										</Text>
										<Text style={styles.clientEmail}>{clients[0].email}</Text>
									</View>
								</View>
							)}
						</View>

						<View style={styles.modalFooter}>
							<TouchableOpacity
								style={[styles.button, { flex: 1, marginRight: 8 }]}
								onPress={() => setShowAddVisitModal(false)}
							>
								<Text style={styles.buttonText}>Отменить</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.buttonSuccess, { flex: 1 }]}
								onPress={handleAddVisit}
							>
								<Text style={styles.buttonText}>Отметить</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		paddingHorizontal: 16,
		paddingTop: 20,
	},
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	welcomeSection: {
		marginBottom: 30,
	},
	welcomeText: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 4,
	},
	welcomeSubtext: {
		fontSize: 14,
		color: '#999',
	},
	statsGrid: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 30,
		gap: 12,
		flexWrap: 'wrap',
	},
	statCard: {
		flex: 1,
		minWidth: '30%',
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 16,
		alignItems: 'center',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	statIconContainer: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 12,
	},
	statValue: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 12,
		color: '#999',
		textAlign: 'center',
	},
	quickActionsSection: {
		marginBottom: 30,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333',
		marginBottom: 12,
	},
	actionButton: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 16,
		alignItems: 'center',
		marginBottom: 12,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	actionButtonText: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
		color: '#333',
		marginLeft: 16,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end',
	},
	modalContent: {
		backgroundColor: '#fff',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		maxHeight: '90%',
		paddingBottom: 20,
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
	},
	modalBody: {
		paddingHorizontal: 20,
		paddingVertical: 16,
	},
	inputLabel: {
		fontSize: 14,
		fontWeight: '600',
		color: '#333',
		marginBottom: 8,
		marginTop: 12,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 16,
		color: '#333',
	},
	modalFooter: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingTop: 16,
		gap: 8,
	},
	button: {
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
		paddingVertical: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonSuccess: {
		backgroundColor: '#4caf50',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
	},
	infoText: {
		fontSize: 14,
		color: '#666',
		marginBottom: 20,
		lineHeight: 20,
	},
	clientInfo: {
		flexDirection: 'row',
		backgroundColor: '#f5f5f5',
		borderRadius: 12,
		padding: 16,
		alignItems: 'center',
		marginTop: 20,
	},
	clientName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333',
	},
	clientEmail: {
		fontSize: 13,
		color: '#999',
		marginTop: 4,
	},
})
