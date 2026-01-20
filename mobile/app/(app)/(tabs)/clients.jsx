import api from '@/src/utils/api'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

export default function ClientsScreen() {
	const router = useRouter()
	const [clients, setClients] = useState([])
	const [filteredClients, setFilteredClients] = useState([])
	const [loading, setLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false)
	const [search, setSearch] = useState('')

	useEffect(() => {
		loadClients()
	}, [])

	useEffect(() => {
		if (search.trim()) {
			const filtered = clients.filter(
				client =>
					`${client.firstName} ${client.lastName}`
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					client.email.toLowerCase().includes(search.toLowerCase()),
			)
			setFilteredClients(filtered)
		} else {
			setFilteredClients(clients)
		}
	}, [search, clients])

	const loadClients = async () => {
		try {
			setLoading(true)
			const response = await api.get('/clients')
			setClients(response.data)
			setFilteredClients(response.data)
		} catch (error) {
			console.error('Error loading clients:', error)
		} finally {
			setLoading(false)
		}
	}

	const onRefresh = async () => {
		setRefreshing(true)
		await loadClients()
		setRefreshing(false)
	}

	const handleClientPress = client => {
		router.push({
			pathname: '/clientDetail/[id]',
			params: { id: client.id },
		})
	}

	const renderClientCard = ({ item }) => (
		<TouchableOpacity
			style={styles.clientCard}
			onPress={() => handleClientPress(item)}
		>
			<View style={styles.avatarContainer}>
				<FontAwesome name='user-circle' size={48} color='#007AFF' />
			</View>
			<View style={styles.clientInfo}>
				<Text style={styles.clientName}>
					{item.firstName} {item.lastName}
				</Text>
				<Text style={styles.clientEmail}>{item.email}</Text>
				<Text style={styles.clientPhone}>{item.phone}</Text>
			</View>
			<FontAwesome name='chevron-right' size={20} color='#999' />
		</TouchableOpacity>
	)

	if (loading) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size='large' color='#007AFF' />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<FontAwesome name='search' size={16} color='#999' />
				<TextInput
					style={styles.searchInput}
					placeholder='Поиск по имени или email'
					placeholderTextColor='#999'
					value={search}
					onChangeText={setSearch}
				/>
				{search ? (
					<TouchableOpacity onPress={() => setSearch('')}>
						<FontAwesome name='times-circle' size={16} color='#999' />
					</TouchableOpacity>
				) : null}
			</View>

			<FlatList
				data={filteredClients}
				renderItem={renderClientCard}
				keyExtractor={item => item.id.toString()}
				contentContainerStyle={styles.listContent}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<FontAwesome name='inbox' size={48} color='#ccc' />
						<Text style={styles.emptyText}>Клиентов не найдено</Text>
					</View>
				}
			/>
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
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		margin: 12,
		paddingHorizontal: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ddd',
	},
	searchInput: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	listContent: {
		padding: 12,
		paddingBottom: 20,
	},
	clientCard: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 12,
		marginBottom: 12,
		alignItems: 'center',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	avatarContainer: {
		marginRight: 12,
	},
	clientInfo: {
		flex: 1,
	},
	clientName: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
		marginBottom: 4,
	},
	clientEmail: {
		fontSize: 12,
		color: '#666',
		marginBottom: 2,
	},
	clientPhone: {
		fontSize: 12,
		color: '#999',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 60,
	},
	emptyText: {
		fontSize: 16,
		color: '#999',
		marginTop: 16,
	},
})
