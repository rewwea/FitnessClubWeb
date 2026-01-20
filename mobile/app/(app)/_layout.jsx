import { useColorScheme } from '@/hooks/use-color-scheme'
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { Stack } from 'expo-router'

const Tab = createBottomTabNavigator()

function getTabBarIcon(color: string, size: number) {
  return (name: string) => <FontAwesome name={name} size={size} color={color} />
}

export default function AppLayout() {
  const colorScheme = useColorScheme() ?? 'light'
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          title: 'Мой профиль',
        }}
      />
      <Stack.Screen
        name="subscriptions"
        options={{
          headerShown: true,
          title: 'Управление абонементами',
        }}
      />
      <Stack.Screen
        name="clientDetail/[id]"
        options={{
          headerShown: true,
          title: 'Информация о клиенте',
        }}
      />
    </Stack>
  )
}
