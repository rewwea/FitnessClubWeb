import api from '@/src/utils/api'
import { FontAwesome } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'

export default function StatsScreen() {
	const [stats, setStats] = useState(null)
	const [loading, setLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		loadStats()
	}, [])

	const loadStats = async () => {
		try {
			setLoading(true)
			const response = await api.get('/stats/summary')
			setStats(response.data)
		} catch (error) {
			console.error('Error loading stats:', error)
		} finally {
			setLoading(false)
		}
	}

	const onRefresh = async () => {
		setRefreshing(true)
		await loadStats()
		setRefreshing(false)
	}

	if (loading) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size='large' color='#007AFF' />
			</View>
		)
	}

	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<View style={styles.statsContainer}>
				<StatCard
					icon='users'
					iconColor='#007AFF'
					iconBgColor='#e3f2fd'
					title='Всего клиентов'
					value={stats?.totalClients || 0}
				/>

				<StatCard
					icon='check-circle'
					iconColor='#4caf50'
					iconBgColor='#e8f5e9'
					title='Активные абонементы'
					value={stats?.activeSubscriptions || 0}
				/>

				<StatCard
					icon='calendar'
					iconColor='#ff9800'
					iconBgColor='#fff3e0'
					title='Всего посещений'
					value={stats?.visits || 0}
				/>

				<StatCard
					icon='clock-o'
					iconColor='#9c27b0'
					iconBgColor='#f3e5f5'
					title='Активные клиенты'
					value={stats?.activeClients || 0}
				/>

				{stats?.expiringSubscriptionsCount !== undefined && (
					<StatCard
						icon='exclamation-circle'
						iconColor='#f44336'
						iconBgColor='#ffebee'
						title='Абонементы заканчиваются'
						value={stats.expiringSubscriptionsCount}
					/>
				)}

				{stats?.clientsWithoutSubscription !== undefined && (
					<StatCard
						icon='user-times'
						iconColor='#2196f3'
						iconBgColor='#e1f5fe'
						title='Без активного абонемента'
						value={stats.clientsWithoutSubscription}
					/>
				)}
			</View>

			{stats?.visitsByMonth && (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Посещения по дням</Text>
					<View style={styles.chartPlaceholder}>
						<Text style={styles.chartText}>График посещений</Text>
					</View>
				</View>
			)}
		</ScrollView>
	)
}

function StatCard({ icon, iconColor, iconBgColor, title, value }) {
	return (
		<View style={styles.statCard}>
			<View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
				<FontAwesome name={icon} size={32} color={iconColor} />
			</View>
			<View style={styles.statContent}>
				<Text style={styles.statTitle}>{title}</Text>
				<Text style={styles.statValue}>{value}</Text>
			</View>
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
	statsContainer: {
		padding: 12,
	},
	statCard: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		alignItems: 'center',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	iconContainer: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 16,
	},
	statContent: {
		flex: 1,
	},
	statTitle: {
		fontSize: 14,
		color: '#999',
		marginBottom: 4,
	},
	statValue: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#333',
	},
	section: {
		padding: 12,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333',
		marginBottom: 12,
	},
	chartPlaceholder: {
		backgroundColor: '#fff',
		borderRadius: 12,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	chartText: {
		fontSize: 14,
		color: '#999',
	},
})
