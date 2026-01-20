import { useAuth } from '@/src/context/AuthContext'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

export default function ProfileScreen() {
	const router = useRouter()
	const { user, signOut } = useAuth()

	const handleLogout = async () => {
		await signOut()
		router.replace('/(auth)/login')
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<FontAwesome name='user-circle' size={80} color='#007AFF' />
				<Text style={styles.userName}>
					{user?.firstName} {user?.lastName}
				</Text>
				<Text style={styles.userEmail}>{user?.email}</Text>
				<View style={styles.roleBadge}>
					<Text style={styles.roleText}>
						{user?.role === 'admin' ? 'Администратор' : 'Менеджер'}
					</Text>
				</View>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Информация</Text>
				<InfoItem icon='envelope' label='Email' value={user?.email} />
				<InfoItem
					icon='briefcase'
					label='Должность'
					value={user?.role === 'admin' ? 'Администратор' : 'Менеджер'}
				/>
			</View>

			<View style={styles.spacer} />

			<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
				<FontAwesome name='sign-out' size={20} color='#fff' />
				<Text style={styles.logoutButtonText}>Выход</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

function InfoItem({ icon, label, value }) {
	return (
		<View style={styles.infoItem}>
			<View style={styles.infoLabel}>
				<FontAwesome name={icon} size={16} color='#007AFF' />
				<Text style={styles.labelText}>{label}</Text>
			</View>
			<Text style={styles.valueText}>{value}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	header: {
		backgroundColor: '#fff',
		paddingVertical: 24,
		paddingHorizontal: 16,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	userName: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#333',
		marginVertical: 12,
	},
	userEmail: {
		fontSize: 14,
		color: '#999',
		marginBottom: 12,
	},
	roleBadge: {
		backgroundColor: '#e3f2fd',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
	},
	roleText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#007AFF',
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
	infoItem: {
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
	valueText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#333',
	},
	spacer: {
		flex: 1,
	},
	logoutButton: {
		backgroundColor: '#f44336',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 14,
		marginHorizontal: 12,
		marginBottom: 20,
		borderRadius: 8,
	},
	logoutButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
		marginLeft: 8,
	},
})
