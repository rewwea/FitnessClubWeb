# Фитнес Клуб - Мобильное приложение

Мобильное приложение для управления фитнес-клубом на React Native с использованием Expo.

## Возможности

- ✅ Авторизация администраторов
- ✅ Просмотр списка клиентов
- ✅ Просмотр информации о клиенте
  - Полная информация о клиенте
  - Активный абонемент
  - История посещений
  - Информация о тренере
- ✅ Просмотр статистики
  - Общее количество клиентов
  - Активные абонементы
  - Посещения
- ✅ Быстрая навигация между экранами

## Требования

- Node.js >= 18
- npm или yarn
- Expo Go app (для мобильных устройств)
- Backend API, запущенный на `http://localhost:3000`

## Установка

1. Перейти в папку проекта:

```bash
cd mobile
```

2. Установить зависимости:

```bash
npm install
```

## Запуск

### На Expo Go (рекомендуется для быстрого тестирования)

```bash
npm start
```

После этого появится QR код. Отсканируйте его в Expo Go приложении.

### На Android эмуляторе

```bash
npm run android
```

### На iOS симуляторе (только на macOS)

```bash
npm run ios
```

### В веб-браузере

```bash
npm run web
```

## Структура проекта

```
app/
├── (auth)/              # Экраны авторизации
│   ├── _layout.jsx      # Layout для auth стека
│   └── login.jsx        # Экран входа
├── (app)/               # Основное приложение
│   ├── (tabs)/          # Tab навигация
│   │   ├── _layout.jsx  # Tab layout
│   │   ├── index.jsx    # Dashboard
│   │   ├── clients.jsx  # Список клиентов
│   │   └── stats.jsx    # Статистика
│   ├── _layout.jsx      # App layout
│   ├── profile.jsx      # Профиль пользователя
│   └── clientDetail/[id].jsx  # Детали клиента
└── _layout.tsx          # Главный layout с авторизацией

src/
├── context/
│   └── AuthContext.js   # Контекст для авторизации
└── utils/
    └── api.js           # API клиент с Axios
```

## Учетные данные для входа

```
Email: admin@example.com
Пароль: password123
```

## API endpoints

Приложение использует следующие endpoints backend:

- `POST /api/auth/login` - Вход администратора
- `POST /api/auth/register` - Регистрация админа
- `GET /api/auth/profile` - Получение профиля
- `GET /api/clients` - Список клиентов
- `GET /api/clients/:id` - Информация о клиенте
- `GET /api/stats/summary` - Статистика

## Технологии

- **React Native** - Кроссплатформенный фреймворк
- **Expo** - Платформа для разработки React Native приложений
- **Expo Router** - Навигация
- **Axios** - HTTP клиент
- **Expo Secure Store** - Безопасное хранение токенов
- **FontAwesome** - Иконки

## Особенности

- 📱 Мобильный дизайн, оптимизированный для сенсорного экрана
- 🔐 Безопасное хранение токенов авторизации
- 🎨 Современный UI с карточками и понятной иерархией
- 🔄 Обновление данных через свайп (pull-to-refresh)
- 🔍 Поиск клиентов в реальном времени
- ⚡ Быстрая загрузка и отзывчивый интерфейс

## Разработка

### Добавление новых экранов

1. Создайте файл в папке `app/(app)/(tabs)/`
2. Экспортируйте компонент по умолчанию
3. Добавьте в `_layout.jsx` новый Tab

### Работа с API

Используйте готовый API клиент:

```javascript
import api from '@/src/utils/api'

// GET запрос
const response = await api.get('/clients')

// POST запрос
const response = await api.post('/auth/login', { email, password })
```

## Решение проблем

### Приложение не подключается к backend

- Убедитесь, что backend запущен на `http://localhost:3000`
- Если используете Android эмулятор, используйте `10.0.2.2:3000` вместо `localhost`

### Проблемы с авторизацией

- Очистите кэш приложения
- Убедитесь, что админ создан в БД через seed скрипт

## Лицензия

ISC

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
