# **АИС «Фитнес-клуб»**

## **1. Общее описание проекта**

- **Название**: АИС «Фитнес-клуб»
    
- **Цель**: Автоматизация работы фитнес-клуба — учёт клиентов, тренеров, абонементов, посещений.
    
- **Основные функции**:
    
    - CRUD операции для клиентов, тренеров, абонементов, посещений
        
    - Логика присвоения тренеров клиентам
        
    - Проверка активности абонементов
        
    - Валидация данных на уровне backend
        
    

---

## **2. Архитектура backend**

### **2.1 Общая структура**

```
backend/
├─ src/
│  ├─ controllers/       # Контроллеры (обработка HTTP-запросов)
│  ├─ services/          # Сервисы (бизнес-логика)
│  ├─ repositories/      # Репозитории (работа с БД через Prisma)
│  ├─ routes/            # Маршруты API
│  ├─ utils/             # Утилиты (Prisma client)
│  ├─ app.js             # Основной файл Express приложения
│  └─ server.js          # Точка входа (запуск сервера)
├─ prisma/
│  ├─ schema.prisma      # Схема базы данных
│  └─ migrations/        # Миграции базы данных
├─ package.json
└─ .env                  # Переменные окружения
```

### **2.2 Модульная структура и принципы**

- **Controllers**: обрабатывают HTTP-запросы, проверяют входные данные, вызывают сервисы.
    
- **Services**: реализуют бизнес-логику и правила работы с данными.
    
- **Repositories**: взаимодействуют с базой данных через Prisma Client.
    
- **Routes**: связывают URL-маршруты с контроллерами.
    
- **Utils**: общие функции, например, подключение к базе данных.
    

**Поток запроса**:

```
HTTP Request -> Route -> Controller -> Service -> Repository -> Prisma -> Database
```

---

## **3. Сущности проекта**

- **Trainer** — тренер клуба. Хранит имя, email, телефон и список клиентов.
    
- **Client** — клиент клуба. Хранит имя, email, телефон, активность, присвоенного тренера и подписки.
    
- **Subscription** — абонемент клиента. Хранит тип, даты начала и окончания, активность и связь с клиентом.
    
- **Visit** — посещение клиента. Хранит дату посещения и связь с клиентом.
    

---

## **4. API backend**

Здесь описан **каждый endpoint**, что делает и как использовать.

### **4.1 Trainers API**

**Функции:**

- Управление тренерами: создание, обновление, удаление, просмотр списка и отдельных тренеров.
    

|**Метод**|**URL**|**Функция**|**Body / Params**|**Пример**|
|---|---|---|---|---|
|GET|/api/trainers|Получить список всех тренеров|—|GET /api/trainers|
|GET|/api/trainers/:id|Получить тренера по ID|id в URL|GET /api/trainers/1|
|POST|/api/trainers|Создать тренера|{ name, email, phone }|POST /api/trainers|
|PUT|/api/trainers/:id|Обновить тренера|{ name?, email?, phone? }|PUT /api/trainers/1|
|DELETE|/api/trainers/:id|Удалить тренера|id в URL|DELETE /api/trainers/1|

**Пример запроса POST**:

```
{
  "name": "Алексей Иванов",
  "email": "alex@mail.ru",
  "phone": "+79991112233"
}
```

---

### **4.2 Clients API**

**Функции:**

- Управление клиентами: создание, обновление, удаление, просмотр списка и отдельных клиентов.
    
- Присвоение тренера клиенту.
    

|**Метод**|**URL**|**Функция**|**Body / Params**|**Пример**|
|---|---|---|---|---|
|GET|/api/clients|Получить всех клиентов|—|GET /api/clients|
|GET|/api/clients/:id|Получить клиента по ID|id в URL|GET /api/clients/1|
|POST|/api/clients|Создать клиента|{ fullName, email, phone, trainerId? }|POST /api/clients|
|PUT|/api/clients/:id|Обновить клиента|{ fullName?, email?, phone?, trainerId? }|PUT /api/clients/1|
|DELETE|/api/clients/:id|Удалить клиента|id в URL|DELETE /api/clients/1|

**Пример запроса POST**:

```
{
  "fullName": "Иван Иванов",
  "email": "ivan@mail.ru",
  "phone": "+79991110001",
  "trainerId": 1
}
```

---

### **4.3 Subscriptions API**

**Функции:**

- Управление абонементами клиентов.
    
- Проверка активности и типа абонемента.
    

|**Метод**|**URL**|**Функция**|**Body / Params**|**Пример**|
|---|---|---|---|---|
|GET|/api/subscriptions|Получить все абонементы|—|GET /api/subscriptions|
|GET|/api/subscriptions/:id|Получить абонемент по ID|id в URL|GET /api/subscriptions/1|
|POST|/api/subscriptions|Создать абонемент|{ type, startDate, endDate, clientId }|POST /api/subscriptions|
|PUT|/api/subscriptions/:id|Обновить абонемент|{ type?, startDate?, endDate?, isActive? }|PUT /api/subscriptions/1|
|DELETE|/api/subscriptions/:id|Удалить абонемент|id в URL|DELETE /api/subscriptions/1|

**Пример запроса POST**:

```
{
  "type": "Студенческий",
  "startDate": "2025-12-01T00:00:00.000Z",
  "endDate": "2026-01-01T00:00:00.000Z",
  "clientId": 1
}
```

---

### **4.4 Visits API**

**Функции:**

- Отслеживание посещений клиентов.
    

|**Метод**|**URL**|**Функция**|**Body / Params**|**Пример**|
|---|---|---|---|---|
|GET|/api/visits|Получить все посещения|—|GET /api/visits|
|GET|/api/visits/:id|Получить посещение по ID|id в URL|GET /api/visits/1|
|POST|/api/visits|Добавить посещение|{ clientId, visitDate? }|POST /api/visits|
|DELETE|/api/visits/:id|Удалить посещение|id в URL|DELETE /api/visits/1|

**Пример запроса POST**:

```
{
  "clientId": 1,
  "visitDate": "2025-12-22T10:00:00.000Z"
}
```

---