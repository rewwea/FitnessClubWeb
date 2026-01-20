import { useColorScheme } from '@/hooks/use-color-scheme'
import { AuthProvider, useAuth } from '@/src/context/AuthContext'
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, View } from 'react-native'
import 'react-native-reanimated'

function RootLayoutNav() {
	const colorScheme = useColorScheme()
	const { isLoading, userToken } = useAuth()

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' color='#007AFF' />
			</View>
		)
	}

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack>
				{userToken == null ? (
					<Stack.Screen
						name='(auth)'
						options={{
							headerShown: false,
						}}
					/>
				) : (
					<Stack.Screen
						name='(app)'
						options={{
							headerShown: false,
						}}
					/>
				)}
			</Stack>
			<StatusBar style='auto' />
		</ThemeProvider>
	)
}

export default function RootLayout() {
	return (
		<AuthProvider>
			<RootLayoutNav />
		</AuthProvider>
	)
}
