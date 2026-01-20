import { useColorScheme } from '@/hooks/use-color-scheme'
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'

const Tab = createBottomTabNavigator()

export default function TabLayout() {
	const colorScheme = useColorScheme() ?? 'light'
	const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

	const getHeaderRight = () => (
		<Link href='/profile' asChild>
			<Pressable
				style={({ pressed }) => ({
					marginRight: 16,
					opacity: pressed ? 0.5 : 1,
				})}
			>
				<FontAwesome name='user-circle' size={24} color={theme.colors.text} />
			</Pressable>
		</Link>
	)

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#007AFF',
				tabBarInactiveTintColor: '#999',
				tabBarStyle: {
					backgroundColor: theme.colors.card,
					borderTopColor: theme.colors.border,
				},
				headerStyle: {
					backgroundColor: theme.colors.card,
					borderBottomColor: theme.colors.border,
				},
				headerTintColor: theme.colors.text,
				headerTitleStyle: {
					fontWeight: '600',
					fontSize: 16,
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Главная',
					headerShown: true,
					headerTitle: 'Фитнес Клуб',
					tabBarIcon: ({ color }) => (
						<FontAwesome name='home' size={24} color={color} />
					),
					headerRight: getHeaderRight,
				}}
			/>
			<Tabs.Screen
				name='clients'
				options={{
					title: 'Клиенты',
					headerShown: true,
					headerTitle: 'Список клиентов',
					tabBarIcon: ({ color }) => (
						<FontAwesome name='users' size={24} color={color} />
					),
					headerRight: getHeaderRight,
				}}
			/>
			<Tabs.Screen
				name='stats'
				options={{
					title: 'Статистика',
					headerShown: true,
					headerTitle: 'Статистика',
					tabBarIcon: ({ color }) => (
						<FontAwesome name='bar-chart' size={24} color={color} />
					),
					headerRight: getHeaderRight,
				}}
			/>
		</Tabs>
	)
}
