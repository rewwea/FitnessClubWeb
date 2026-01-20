# 💪 Фитнес-клуб | Автоматизированная информационная система

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2-blue?style=flat-square&logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-blue?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54-black?style=flat-square&logo=expo)](https://expo.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-0A66C2?style=flat-square&logo=prisma)](https://www.prisma.io/)

Полнофункциональная система управления фитнес-клубом с веб и мобильным интерфейсом. Проект разработан в рамках **двух учебных практик**:

- 🔧 **Первая практика** - Backend REST API + Web Frontend
- 📱 **Вторая практика** - Mobile приложение + Backend авторизация

---

## 🚀 Быстрый старт

### Требования

- Node.js ≥ 18
- Docker (для PostgreSQL)
- npm/yarn

### 30 секунд до запуска

```bash
# 1. Запустить БД
docker-compose up -d

# 2. Backend
cd backend && npm install && npx prisma db seed && npm start

# 3. Mobile (в новом терминале)
cd mobile && npm install && npm start
```

**Вход:** `admin@example.com` / `password123`

---

## 📚 Содержание

- [Первая практика](#-первая-практика-backend--web)
- [Вторая практика](#-вторая-практика-mobile--backend-auth)
- [Архитектура](#-архитектура)
- [API документация](#-api-документация)
- [Технологический стек](#-технологический-стек)
- [Инструкции по запуску](#-инструкции-по-запуску)
- [Структура БД](#-структура-базы-данных)

---

## 🔧 Первая практика: Backend + Web

**Статус:** ✅ Production Ready | **Дата:** Декабрь 2025

### Что реализовано

#### 📊 Backend REST API (Node.js + Express + Prisma)

Полнофункциональный backend с многоуровневой архитектурой (Controllers → Services → Repositories).

**Модули:**

| Модуль                   | Описание                | Endpoints                                          |
| ------------------------ | ----------------------- | -------------------------------------------------- |
| **Clients**              | Управление клиентами    | GET, POST, PUT, DELETE `/api/clients`              |
| **Trainers**             | Управление тренерами    | GET, POST, PUT, DELETE `/api/trainers`             |
| **Subscriptions**        | Управление абонементами | GET, POST, PUT, DELETE `/api/subscription-types`   |
| **Client Subscriptions** | Выданные абонементы     | GET, POST, PUT, DELETE `/api/client-subscriptions` |
| **Visits**               | Записи посещений        | GET, POST, DELETE `/api/visits`                    |
| **Subscription Freeze**  | Заморозка абонементов   | GET, POST, DELETE `/api/subscription-freeze`       |
| **Statistics**           | Статистика и аналитика  | GET `/api/stats/*`                                 |

**Ключевые особенности:**

- ✅ REST API без "магии"
- ✅ Валидация входных данных
- ✅ Подробное логирование на каждом уровне
- ✅ Мягкое удаление сущностей (soft delete)
- ✅ Связи между сущностями в БД
- ✅ CORS включен
- ✅ Graceful error handling

**Архитектурные решения:**

```
┌─ HTTP запрос
├─ Controllers (обработка запроса)
├─ Services (бизнес-логика)
├─ Repositories (работа с БД)
└─ Prisma ORM (SQL запросы)
```

#### 🎨 Web Frontend (React)

Современный веб-интерфейс для управления клубом.

**Страницы:**

- 📋 Таблица клиентов
- 👨‍🏫 Таблица тренеров
- 🎟️ Управление абонементами
- 📊 Dashboard со статистикой
- 🎯 Быстрые действия

**Технологии:**

- React 18
- Vite (быстрая сборка)
- Tailwind CSS (современный стиль)
- Axios (HTTP клиент)

### 📁 Структура

```
backend/
├── src/
│   ├── controllers/       # HTTP обработка
│   │   ├── client.controller.js
│   │   ├── trainer.controller.js
│   │   ├── stats.controller.js
│   │   └── [и другие]
│   ├── services/          # Бизнес-логика
│   │   ├── client.service.js
│   │   ├── trainer.service.js
│   │   └── [и другие]
│   ├── repositories/      # Работа с БД
│   │   ├── client.repository.js
│   │   ├── trainer.repository.js
│   │   └── [и другие]
│   ├── routes/            # Маршруты API
│   ├── app.js             # Конфигурация Express
│   └── server.js          # Запуск сервера
├── prisma/
│   ├── schema.prisma      # Схема БД
│   └── migrations/        # История миграций
└── package.json

frontend/
├── src/
│   ├── components/        # React компоненты
│   ├── pages/             # Страницы
│   ├── utils/             # Утилиты
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### 🎯 Основные концепции

1. **Слоистая архитектура** - каждый слой отвечает за свое
2. **Repository Pattern** - изоляция логики работы с БД
3. **Service Pattern** - переиспользуемая бизнес-логика
4. **REST API** - стандартные HTTP методы
5. **Логирование** - отследимость всех операций

---

## 📱 Вторая практика: Mobile + Backend Auth

**Статус:** ✅ Production Ready | **Дата:** Январь 2026

### Что реализовано

#### 🔐 Система авторизации администраторов

Backend расширен с поддержкой аутентификации администраторов.

**Новое в Backend:**

| Компонент           | Описание                         |
| ------------------- | -------------------------------- |
| **Admin Model**     | Таблица администраторов в БД     |
| **Auth Controller** | Обработка запросов авторизации   |
| **Auth Service**    | Логика авторизации и хеширования |
| **Auth Repository** | Работа с admin в БД              |
| **Auth Routes**     | `/api/auth/*` endpoints          |

**API Endpoints:**

```
POST   /api/auth/register    - Регистрация админа
POST   /api/auth/login       - Вход в систему
GET    /api/auth/profile     - Получить профиль
GET    /api/auth/admins      - Список администраторов
```

**Безопасность:**

- ✅ SHA-256 хеширование паролей
- ✅ Защита от SQL injection через Prisma
- ✅ Валидация входных данных
- ✅ Unique constraint на email

#### 📱 Мобильное приложение (React Native + Expo)

Кроссплатформенное мобильное приложение для администраторов.

**6 Экранов:**

| Экран              | Функциональность                                                |
| ------------------ | --------------------------------------------------------------- |
| **Login**          | Вход по email/пароль, демо учетные данные                       |
| **Dashboard**      | Статистика: клиенты, абонементы, посещения + быстрые действия   |
| **Clients List**   | Список всех клиентов, поиск в реальном времени, pull-to-refresh |
| **Client Details** | Полная информация о клиенте, абонемент, посещения, тренер       |
| **Statistics**     | Подробная аналитика с 6 карточками метрик                       |
| **Profile**        | Профиль администратора, выход из аккаунта                       |
| **Subscriptions**  | Управление абонементами клиентов                                |

**Ключевые особенности:**

- ✅ Безопасное хранение токенов (Expo Secure Store)
- ✅ Автоматическое восстановление сессии
- ✅ Поиск в реальном времени
- ✅ Pull-to-refresh для синхронизации
- ✅ Loading states и error handling
- ✅ Адаптивный мобильный дизайн
- ✅ FontAwesome иконки
- ✅ **Добавление новых клиентов** (модальное окно)
- ✅ **Отметка посещений** (быстрое действие)
- ✅ **Управление абонементами** (полноценный экран с CRUD)

**Технологический стек:**

```
React Native          - Кроссплатформенный UI
Expo                  - Платформа разработки
Expo Router           - Файловая навигация (как Next.js)
Axios                 - HTTP клиент
Expo Secure Store     - Безопасное хранилище
React Context         - State management
```

### 📁 Структура

```
mobile/
├── app/
│   ├── (auth)/                    # Auth Stack
│   │   ├── _layout.jsx
│   │   └── login.jsx              # Экран входа
│   ├── (app)/                     # App Stack
│   │   ├── (tabs)/
│   │   │   ├── _layout.jsx        # Tab Navigator
│   │   │   ├── index.jsx          # Dashboard
│   │   │   ├── clients.jsx        # Список клиентов
│   │   │   └── stats.jsx          # Статистика
│   │   ├── _layout.jsx
│   │   ├── profile.jsx            # Профиль
│   │   ├── subscriptions.jsx      # Управление абонементами
│   │   └── clientDetail/
│   │       └── [id].jsx           # Детали клиента
│   └── _layout.tsx                # Root Layout + Auth Provider
├── src/
│   ├── context/
│   │   └── AuthContext.js         # Контекст авторизации
│   └── utils/
│       └── api.js                 # Axios клиент с перехватчиками
└── package.json
```

### 🔄 Интеграция

**Mobile ↔ Backend:**

```
┌─ Mobile App
│
├─ Login Screen
│  └─ POST /api/auth/login
│
├─ Dashboard
│  └─ GET /api/stats/summary
│
├─ Clients List
│  └─ GET /api/clients
│
├─ Client Details
│  └─ GET /api/clients/:id
│
└─ Statistics
   └─ GET /api/stats/summary
```

---

## 🏗️ Архитектура

### Backend: Многоуровневая архитектура

```
Request Flow:
┌──────────────────────────────────────┐
│   HTTP Request (Express Router)      │
└──────────────────┬───────────────────┘
                   │
        ┌──────────▼──────────┐
        │   Controller Layer   │ ← Обработка HTTP
        │  (Request/Response) │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │   Service Layer     │ ← Бизнес-логика
        │  (Business Logic)   │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │  Repository Layer   │ ← Работа с БД
        │   (Data Access)     │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │    Prisma ORM       │ ← SQL Query Builder
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │   PostgreSQL        │ ← Database
        └─────────────────────┘
```

**Преимущества:**

- 🔄 Переиспользуемость кода
- 🧪 Легко тестировать
- 📖 Понятная структура
- 🔒 Разделение ответственности

### Mobile: State Management

```
App State (React Context)
├─ isLoading: boolean
├─ isSignout: boolean
├─ userToken: string | null
└─ user: Admin | null
    ├─ id
    ├─ firstName
    ├─ lastName
    ├─ email
    └─ role

Auth Actions
├─ signIn(email, password)
├─ signOut()
└─ signUp(userData)
```

**Navigation Flow:**

```
Root Layout
├─ userToken == null
│  └─ Auth Stack
│     └─ Login Screen
└─ userToken != null
   └─ App Stack
      ├─ Tabs Navigator
      │  ├─ Dashboard (Home)
      │  ├─ Clients (Users)
      │  └─ Stats (Charts)
      ├─ Profile
      └─ Client Details [id]
```

---

## 💾 Архитектура БД (Prisma)

```prisma
model Client {
  id          Int
  firstName   String
  lastName    String
  email       String @unique
  phone       String @unique
  birthDate   DateTime
  isActive    Boolean @default(true)
  trainer     Trainer?
  subscriptions ClientSubscription[]
  visits      Visit[]
}

model Trainer {
  id          Int
  firstName   String
  lastName    String
  email       String @unique
  phone       String?
  specialty   String
  isActive    Boolean @default(true)
  clients     Client[]
  visits      Visit[]
}

model SubscriptionType {
  id            Int
  name          String
  durationDays  Int
  price         Int
  isActive      Boolean @default(true)
  clientSubscriptions ClientSubscription[]
}

model ClientSubscription {
  id        Int
  client    Client
  type      SubscriptionType
  startDate DateTime
  endDate   DateTime
  price     Int
  isActive  Boolean @default(true)
  freezes   SubscriptionFreeze[]
}

model Visit {
  id        Int
  client    Client
  trainer   Trainer?
  visitDate DateTime @default(now())
}

model SubscriptionFreeze {
  id          Int
  subscription ClientSubscription
  startDate   DateTime
  endDate     DateTime
}

model Admin {
  id        Int
  firstName String
  lastName  String
  email     String @unique
  password  String (SHA-256)
  role      String @default("manager")
  isActive  Boolean @default(true)
}
```

---

## 🛠️ Технологический стек

### Backend

- **Runtime:** Node.js 18+
- **Framework:** Express.js 5.2
- **Database:** PostgreSQL 15
- **ORM:** Prisma 5.22
- **Pattern:** Layered Architecture (MVC-like)

### Frontend Web

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios

### Frontend Mobile

- **Framework:** React Native 0.76
- **Platform:** Expo 54
- **Routing:** Expo Router
- **State:** React Context API
- **Storage:** Expo Secure Store
- **HTTP:** Axios

### DevOps

- **Container:** Docker + Docker Compose
- **Version Control:** Git

---

## 📋 API Документация

### Clients API

```bash
# Получить всех клиентов
GET /api/clients

# Получить клиента по ID
GET /api/clients/:id

# Создать клиента
POST /api/clients
{
  "firstName": "string",
  "lastName": "string",
  "email": "string@example.com",
  "phone": "+7999...",
  "birthDate": "2000-01-01"
}

# Обновить клиента
PUT /api/clients/:id

# Удалить клиента (soft delete)
DELETE /api/clients/:id
```

### Stats API

```bash
# Получить сводку статистики
GET /api/stats/summary
# Возвращает: totalClients, activeSubscriptions, visits, activeClients

# Посещения по дням
GET /api/stats/visits-by-days?days=7

# Топ клиентов
GET /api/stats/top-clients?limit=5

# Клиенты без подписки
GET /api/stats/clients-without-subscription

# Абонементы заканчиваются
GET /api/stats/subscriptions-expiring?days=7
```

### Auth API (вторая практика)

```bash
# Регистрация
POST /api/auth/register
{
  "firstName": "string",
  "lastName": "string",
  "email": "string@example.com",
  "password": "string"
}

# Вход
POST /api/auth/login
{
  "email": "string@example.com",
  "password": "string"
}
# Возвращает: admin object + token

# Получить профиль
GET /api/auth/profile
Headers: x-admin-id: 1

# Все администраторы
GET /api/auth/admins
```

---

## 🚀 Инструкции по запуску

### Предварительные требования

```bash
# Проверить Node.js
node --version  # ≥ 18.0.0

# Проверить npm
npm --version

# Проверить Docker
docker --version
```

### 1️⃣ Запуск Backend

```bash
# Перейти в папку
cd backend

# Установить зависимости
npm install

# Запустить PostgreSQL в Docker
docker-compose up -d

# Создать таблицы и админа
npx prisma db seed

# Запустить сервер
npm start

# Сервер запустится на http://localhost:3000
```

**Dev режим:**

```bash
npm run dev  # С nodemon для автоперезагрузки
```

### 2️⃣ Запуск Frontend Web

```bash
# Перейти в папку
cd frontend

# Установить зависимости
npm install

# Запустить dev сервер
npm run dev

# Откроется на http://localhost:5173
```

### 3️⃣ Запуск Mobile (вторая практика)

```bash
# Перейти в папку
cd mobile

# Установить зависимости
npm install

# Запустить Expo
npm start

# Выберите опцию:
# 'a' - Android эмулятор
# 'i' - iOS симулятор (macOS)
# 'w' - Web браузер
# Или отсканируйте QR код в Expo Go приложении
```

### 📝 Тестовые данные

```
📧 Email: admin@example.com
🔐 Пароль: password123
👤 Роль: admin
```

Созданы через seed скрипт: `backend/prisma/seed.js`

---

## 🧪 Тестирование API

### Используя curl

```bash
# Вход
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Получить клиентов
curl http://localhost:3000/api/clients

# Получить статистику
curl http://localhost:3000/api/stats/summary
```

### Используя Postman

1. Import → Paste Raw Text
2. Скопировать Postman collection JSON
3. Использовать ready-to-use requests

---

## 📊 Статистика проекта

### Первая практика (Backend + Web)

| Метрика              | Значение |
| -------------------- | -------- |
| Backend файлов       | 18+      |
| Frontend компонентов | 10+      |
| Модели БД            | 7        |
| API endpoints        | 30+      |
| Строк кода           | ~3000    |

### Вторая практика (Mobile + Auth)

| Метрика             | Значение   |
| ------------------- | ---------- |
| Mobile экранов      | 6          |
| Auth компонентов    | 4          |
| Новых API endpoints | 4          |
| Строк кода          | ~2500      |
| **Всего строк**     | **~5500+** |

---

## 🎓 Что можно выучить

### Backend паттерны

- ✅ REST API разработка
- ✅ Layered Architecture
- ✅ Repository Pattern
- ✅ Service Pattern
- ✅ ORM (Prisma)
- ✅ Database миграции

### Frontend паттерны

- ✅ React компоненты
- ✅ State Management (Context API)
- ✅ HTTP клиенты (Axios)
- ✅ Navigation (React Router, Expo Router)
- ✅ UI/UX дизайн

### Общие концепции

- ✅ Разделение ответственности
- ✅ Масштабируемость
- ✅ Безопасность (хеширование, валидация)
- ✅ Логирование и отладка
- ✅ Production-ready код

---

## 📚 Дополнительные ресурсы

### Документация

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [Mobile README](mobile/README.md)

### Инструменты

- Postman - Тестирование API
- DBeaver - Работа с БД
- Prisma Studio - Visual DB editor

```bash
# Открыть Prisma Studio
npx prisma studio
```

---

## 🐛 Решение проблем

### Backend не запускается

```bash
# Проверить Docker
docker-compose ps

# Пересоздать контейнер
docker-compose down && docker-compose up -d

# Создать админа
npx prisma db seed

# Запустить
npm start
```

### Mobile - "No route named 'clientDetail'" (Ошибка навигации)

**Решение:** Папка `clientDetail` должна быть в `mobile/app/(app)/clientDetail/`

```bash
# Проверить структуру
ls mobile/app/\(app\)/clientDetail/

# Если папка в корне app/, переместить:
mv mobile/app/clientDetail mobile/app/\(app\)/clientDetail
```

### Mobile - Network Error (iOS симулятор не подключается)

iOS симулятор не может использовать `localhost` - нужен `127.0.0.1`:

**Изменить в `mobile/src/utils/api.js`:**

```javascript
// Для iOS симулятора (текущее значение):
const API_BASE_URL = 'http://127.0.0.1:3000/api'

// ДЛЯ РЕАЛЬНОГО УСТРОЙСТВА или Android эмулятора:
// Узнайте ваш IP: ifconfig | grep "inet "
const API_BASE_URL = 'http://192.168.1.X:3000/api' // Замените X на ваш IP
```

**Проверить что backend работает:**

```bash
# В отдельном терминале
curl http://127.0.0.1:3000/api/clients
```

### Mobile - "Metro bundler errors"

```bash
cd mobile

# Полная очистка и переустановка
rm -rf node_modules .expo && npm install

# Перезапуск с очисткой
npm start -- --clear

# Или нажмите 'r' в консоли при запущенном приложении
```

### Mobile - Simulator not found (Симулятор не найден)

```bash
# Запустить Xcode
open /Applications/Xcode.app

# Или открыть simulator напрямую
xcrun simctl list devices

# Запустить device
xcrun simctl boot "iPhone 16 Pro"  # Замените на ваш device ID
```

### Ошибка при миграции БД

```bash
# Сбросить БД (⚠️ Потеря данных!)
npx prisma migrate reset

# Или создать новую миграцию
npx prisma migrate dev --name your_migration_name
```

---

## 📈 Развитие проекта

### Краткосрочные улучшения

- [ ] JWT вместо Base64 токенов
- [ ] Refresh tokens механизм
- [ ] Form validation на frontend
- [ ] Темный режим в мобильном приложении

### Среднесрочные расширения

- [ ] Оффлайн синхронизация в mobile
- [ ] Push-уведомления
- [ ] GraphQL API вместо REST
- [ ] WebSocket для real-time обновлений

### Долгосрочная стратегия

- [ ] Analytics и BI dashboard
- [ ] Machine Learning для рекомендаций
- [ ] Интеграция с платежными системами
- [ ] Multi-language поддержка

---

## 🤝 Рекомендации для production

### Безопасность

- ✅ Использовать bcrypt вместо SHA-256
- ✅ Добавить JWT с short-lived токенами
- ✅ HTTPS/SSL сертификаты
- ✅ Rate limiting на API
- ✅ Input sanitization
- ✅ CORS правильная конфигурация

### Performance

- ✅ Database индексы на часто используемые поля
- ✅ Кэширование (Redis)
- ✅ CDN для статических файлов
- ✅ Pagination на большие списки
- ✅ Lazy loading на frontend

### DevOps

- ✅ CI/CD pipeline (GitHub Actions)
- ✅ Логирование и мониторинг
- ✅ Backup и восстановление БД
- ✅ Load balancing
- ✅ Docker скейлинг

---

## 📝 Лицензия

ISC - Свободно используйте в учебных целях

---

## 👨‍💻 Автор

Разработано как практический проект для обучения modern web/mobile разработке.

**Дата:** Декабрь 2025 - Январь 2026  
**Статус:** ✅ Production Ready

---

## 🙏 Благодарности

Спасибо за использование этого проекта! Надеюсь, вы научились чему-то новому.

**Если нашли баг или есть предложения - создайте Issue! 📬**
