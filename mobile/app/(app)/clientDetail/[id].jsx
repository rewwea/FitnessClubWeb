import api from '@/src/utils/api'
import { FontAwesome } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'

export default function ClientDetailScreen() {
	const { id } = useLocalSearchParams()
	const [client, setClient] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (id) {
			loadClient()
		}
	}, [id])

	const loadClient = async () => {
		try {
			setLoading(true)
			const response = await api.get(`/clients/${id}`)
			setClient(response.data)
		} catch (error) {
			console.error('Error loading client:', error)
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size='large' color='#007AFF' />
			</View>
		)
	}

	if (!client) {
		return (
			<View style={styles.centerContainer}>
				<Text style={styles.errorText}>Клиент не найден</Text>
			</View>
		)
	}

	const formatDate = date => {
		if (!date) return 'N/A'
		return new Date(date).toLocaleDateString('ru-RU')
	}

	const isSubscriptionActive = client.subscriptions?.some(
		sub => new Date(sub.endDate) > new Date(),
	)

	const activeSubscription = client.subscriptions?.find(
		sub => new Date(sub.endDate) > new Date(),
	)

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			{/* Профиль клиента */}
			<View style={styles.profileSection}>
				<View style={styles.avatarContainer}>
					<FontAwesome name='user-circle' size={80} color='#007AFF' />
				</View>
				<Text style={styles.clientName}>
					{client.firstName} {client.lastName}
				</Text>
				<View
					style={[
						styles.statusBadge,
						{ backgroundColor: client.isActive ? '#e8f5e9' : '#ffebee' },
					]}
				>
					<Text
						style={[
							styles.statusText,
							{ color: client.isActive ? '#4caf50' : '#f44336' },
						]}
					>
						{client.isActive ? 'Активен' : 'Неактивен'}
					</Text>
				</View>
			</View>

			{/* Контактная информация */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Контактная информация</Text>
				<InfoRow icon='envelope' label='Email' value={client.email} />
				<InfoRow icon='phone' label='Телефон' value={client.phone} />
				<InfoRow
					icon='calendar'
					label='Дата рождения'
					value={formatDate(client.birthDate)}
				/>
			</View>

			{/* Текущий абонемент */}
			{activeSubscription ? (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Текущий абонемент</Text>
					<View
						style={[
							styles.subscriptionCard,
							{ borderColor: '#4caf50', borderWidth: 2 },
						]}
					>
						<View style={styles.subscriptionHeader}>
							<Text style={styles.subscriptionType}>
								{activeSubscription.type?.name}
							</Text>
							<View style={styles.activeBadge}>
								<FontAwesome name='check-circle' size={16} color='#4caf50' />
								<Text style={styles.activeBadgeText}>Активен</Text>
							</View>
						</View>
						<InfoRow
							icon='calendar-o'
							label='Начало'
							value={formatDate(activeSubscription.startDate)}
							small
						/>
						<InfoRow
							icon='calendar'
							label='Окончание'
							value={formatDate(activeSubscription.endDate)}
							small
						/>
						<InfoRow
							icon='money'
							label='Цена'
							value={`${activeSubscription.price} руб.`}
							small
						/>
					</View>
				</View>
			) : (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Абонемент</Text>
					<View style={styles.noSubscriptionCard}>
						<FontAwesome
							name='exclamation-triangle'
							size={32}
							color='#ff9800'
						/>
						<Text style={styles.noSubscriptionText}>
							Нет активного абонемента
						</Text>
					</View>
				</View>
			)}

			{/* История посещений */}
			{client.visits && client.visits.length > 0 && (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Последние посещения</Text>
					{client.visits.slice(0, 5).map((visit, index) => (
						<View key={index} style={styles.visitItem}>
							<FontAwesome name='check' size={16} color='#4caf50' />
							<Text style={styles.visitDate}>
								{formatDate(visit.visitDate)}
							</Text>
							{visit.trainer && (
								<Text style={styles.visitTrainer}>
									с {visit.trainer.firstName}
								</Text>
							)}
						</View>
					))}
					<Text style={styles.visitCount}>
						Всего посещений: {client.visits.length}
					</Text>
				</View>
			)}

			{/* Тренер */}
			{client.trainer && (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Тренер</Text>
					<View style={styles.trainerCard}>
						<FontAwesome name='user' size={24} color='#007AFF' />
						<View style={styles.trainerInfo}>
							<Text style={styles.trainerName}>
								{client.trainer.firstName} {client.trainer.lastName}
							</Text>
							<Text style={styles.trainerSpecialty}>
								{client.trainer.specialty}
							</Text>
							<Text style={styles.trainerContact}>{client.trainer.email}</Text>
						</View>
					</View>
				</View>
			)}
		</ScrollView>
	)
}

function InfoRow({ icon, label, value, small = false }) {
	return (
		<View style={styles.infoRow}>
			<View style={styles.infoLabel}>
				<FontAwesome name={icon} size={16} color='#007AFF' />
				<Text style={[styles.labelText, small && styles.smallLabel]}>
					{label}
				</Text>
			</View>
			<Text style={[styles.valueText, small && styles.smallValue]}>
				{value}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileSection: {
		backgroundColor: '#fff',
		paddingVertical: 24,
		paddingHorizontal: 16,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	avatarContainer: {
		marginBottom: 12,
	},
	clientName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 12,
	},
	statusBadge: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
	},
	statusText: {
		fontSize: 12,
		fontWeight: '600',
	},
	section: {
		backgroundColor: '#fff',
		marginVertical: 12,
		marginHorizontal: 12,
		borderRadius: 12,
		padding: 16,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
		marginBottom: 12,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	infoLabel: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	labelText: {
		fontSize: 14,
		color: '#666',
		marginLeft: 8,
	},
	smallLabel: {
		fontSize: 12,
	},
	valueText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#333',
	},
	smallValue: {
		fontSize: 12,
	},
	subscriptionCard: {
		backgroundColor: '#f9f9f9',
		borderRadius: 8,
		padding: 12,
		marginTop: 12,
	},
	subscriptionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	subscriptionType: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
	},
	activeBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#e8f5e9',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
	},
	activeBadgeText: {
		fontSize: 12,
		color: '#4caf50',
		marginLeft: 4,
		fontWeight: '600',
	},
	noSubscriptionCard: {
		backgroundColor: '#fff3e0',
		borderRadius: 8,
		padding: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noSubscriptionText: {
		fontSize: 14,
		color: '#ff9800',
		marginTop: 12,
		fontWeight: '500',
	},
	visitItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	visitDate: {
		fontSize: 14,
		color: '#333',
		marginLeft: 8,
		flex: 1,
	},
	visitTrainer: {
		fontSize: 12,
		color: '#999',
	},
	visitCount: {
		fontSize: 12,
		color: '#999',
		marginTop: 12,
		fontStyle: 'italic',
	},
	trainerCard: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f9f9f9',
		borderRadius: 8,
		padding: 12,
	},
	trainerInfo: {
		marginLeft: 12,
		flex: 1,
	},
	trainerName: {
		fontSize: 14,
		fontWeight: '600',
		color: '#333',
		marginBottom: 4,
	},
	trainerSpecialty: {
		fontSize: 12,
		color: '#999',
		marginBottom: 2,
	},
	trainerContact: {
		fontSize: 12,
		color: '#007AFF',
	},
	errorText: {
		fontSize: 16,
		color: '#999',
	},
})
