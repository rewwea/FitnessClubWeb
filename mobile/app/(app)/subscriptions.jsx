import api from '@/src/utils/api'
import { FontAwesome } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Modal,
	RefreshControl,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

export default function SubscriptionsScreen() {
	const [subscriptions, setSubscriptions] = useState([])
	const [clients, setClients] = useState([])
	const [subscriptionTypes, setSubscriptionTypes] = useState([])
	const [loading, setLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [selectedClient, setSelectedClient] = useState(null)
	const [selectedType, setSelectedType] = useState(null)

	useFocusEffect(
		useCallback(() => {
			loadData()
		}, []),
	)

	const loadData = async () => {
		try {
			setLoading(true)
			const [subsRes, clientsRes, typesRes] = await Promise.all([
				api.get('/client-subscriptions'),
				api.get('/clients'),
				api.get('/subscription-types'),
			])
			setSubscriptions(subsRes.data)
			setClients(clientsRes.data)
			setSubscriptionTypes(typesRes.data)
		} catch (error) {
			console.error('Error loading subscriptions:', error)
			Alert.alert('Ошибка', 'Не удалось загрузить данные')
		} finally {
			setLoading(false)
			setRefreshing(false)
		}
	}

	const handleAddSubscription = async () => {
		if (!selectedClient || !selectedType) {
			Alert.alert('Ошибка', 'Выберите клиента и тип абонемента')
			return
		}

		try {
			const type = subscriptionTypes.find(t => t.id === selectedType)
			const startDate = new Date().toISOString().split('T')[0]
			const endDate = new Date()
			endDate.setDate(endDate.getDate() + type.durationDays)

			await api.post('/client-subscriptions', {
				clientId: selectedClient,
				subscriptionTypeId: selectedType,
				startDate,
				endDate: endDate.toISOString().split('T')[0],
				price: type.price,
			})

			Alert.alert('Успешно', 'Абонемент добавлен')
			setShowModal(false)
			setSelectedClient(null)
			setSelectedType(null)
			loadData()
		} catch (error) {
			Alert.alert(
				'Ошибка',
				error.response?.data?.message || 'Не удалось добавить абонемент',
			)
		}
	}

	const renderSubscription = ({ item }) => {
		const client = clients.find(c => c.id === item.clientId)
		const type = subscriptionTypes.find(t => t.id === item.subscriptionTypeId)
		const endDate = new Date(item.endDate)
		const isActive = endDate > new Date()

		return (
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<View>
						<Text style={styles.clientName}>
							{client?.firstName} {client?.lastName}
						</Text>
						<Text style={styles.typeName}>{type?.name}</Text>
					</View>
					<View
						style={[
							styles.statusBadge,
							{ backgroundColor: isActive ? '#e8f5e9' : '#ffebee' },
						]}
					>
						<Text
							style={[
								styles.statusText,
								{ color: isActive ? '#4caf50' : '#f44336' },
							]}
						>
							{isActive ? 'Активно' : 'Истекло'}
						</Text>
					</View>
				</View>
				<View style={styles.cardBody}>
					<View style={styles.row}>
						<Text style={styles.label}>Начало:</Text>
						<Text style={styles.value}>
							{new Date(item.startDate).toLocaleDateString('ru-RU')}
						</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Конец:</Text>
						<Text style={styles.value}>
							{endDate.toLocaleDateString('ru-RU')}
						</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Цена:</Text>
						<Text style={[styles.value, { fontWeight: 'bold' }]}>
							{item.price}₽
						</Text>
					</View>
				</View>
			</View>
		)
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
			<FlatList
				data={subscriptions}
				renderItem={renderSubscription}
				keyExtractor={item => item.id.toString()}
				contentContainerStyle={styles.container}
				ListHeaderComponent={
					<View style={styles.header}>
						<Text style={styles.title}>Абонементы</Text>
						<Text style={styles.subtitle}>Всего: {subscriptions.length}</Text>
					</View>
				}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={loadData} />
				}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<FontAwesome name='inbox' size={48} color='#ccc' />
						<Text style={styles.emptyText}>Нет абонементов</Text>
					</View>
				}
			/>

			<TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
				<FontAwesome name='plus' size={24} color='#fff' />
			</TouchableOpacity>

			{/* Модаль добавления абонемента */}
			<Modal
				visible={showModal}
				animationType='slide'
				transparent
				onRequestClose={() => setShowModal(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Добавить абонемент</Text>
							<TouchableOpacity onPress={() => setShowModal(false)}>
								<FontAwesome name='times' size={24} color='#333' />
							</TouchableOpacity>
						</View>

						<View style={styles.modalBody}>
							<Text style={styles.label}>Выберите клиента:</Text>
							<View style={styles.pickerContainer}>
								<Picker
									selectedValue={selectedClient}
									onValueChange={setSelectedClient}
									style={styles.picker}
								>
									<Picker.Item label='Выберите клиента' value={null} />
									{clients.map(client => (
										<Picker.Item
											key={client.id}
											label={`${client.firstName} ${client.lastName}`}
											value={client.id}
										/>
									))}
								</Picker>
							</View>

							<Text style={styles.label}>Выберите тип абонемента:</Text>
							<View style={styles.pickerContainer}>
								<Picker
									selectedValue={selectedType}
									onValueChange={setSelectedType}
									style={styles.picker}
								>
									<Picker.Item label='Выберите абонемент' value={null} />
									{subscriptionTypes.map(type => (
										<Picker.Item
											key={type.id}
											label={`${type.name} - ${type.price}₽ (${type.durationDays} дней)`}
											value={type.id}
										/>
									))}
								</Picker>
							</View>
						</View>

						<View style={styles.modalFooter}>
							<TouchableOpacity
								style={[styles.button, { flex: 1, marginRight: 8 }]}
								onPress={() => setShowModal(false)}
							>
								<Text style={styles.buttonText}>Отменить</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.buttonSuccess, { flex: 1 }]}
								onPress={handleAddSubscription}
							>
								<Text style={[styles.buttonText, { color: '#fff' }]}>
									Добавить
								</Text>
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
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		marginBottom: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 14,
		color: '#999',
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 12,
		paddingBottom: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	clientName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 4,
	},
	typeName: {
		fontSize: 13,
		color: '#999',
	},
	statusBadge: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
	},
	statusText: {
		fontSize: 12,
		fontWeight: '600',
	},
	cardBody: {
		gap: 8,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	label: {
		fontSize: 13,
		color: '#666',
		fontWeight: '500',
	},
	value: {
		fontSize: 13,
		color: '#333',
	},
	emptyContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 60,
	},
	emptyText: {
		fontSize: 16,
		color: '#999',
		marginTop: 12,
	},
	fab: {
		position: 'absolute',
		bottom: 20,
		right: 20,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: '#007AFF',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3,
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
		maxHeight: '80%',
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
		paddingVertical: 20,
	},
	pickerContainer: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		marginBottom: 20,
		overflow: 'hidden',
	},
	picker: {
		height: 120,
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
})
