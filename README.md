# Quiz App на React + MongoDB

Приложение для прохождения тестов с сохранением истории и возможностью редактирования/удаления вопросов. Используется собственный backend с базой данных MongoDB, запущенной в Docker.

## Стек технологий

### Фронтенд:
- React
- Redux
- React Router DOM
- JavaScript
- Vite

### Бэкенд:
- Node.js
- Express
- Mongoose (MongoDB)
- Docker (для запуска MongoDB)

##  Функциональность

-  Запуск теста с пошаговой навигацией по вопросам
-  Подсветка выбранного ответа
-  Подсчёт количества правильных ответов
-  Сохранение истории прохождений (дата и результат)
-  Режим редактирования вопросов:
  - Добавление новых
  - Изменение/Удаление существующих

##  Превью

###  Главная страница:
![Главная](.src/assets/main-preview.png)

###  Процесс прохождения:
![Вопрос](.src/assets/question-preview.jpg)

###  Результат:
![Результат](.src/assets/result-preview.png)

###  Редактирование вопросов:
![Результат](.src/assets/edit-questions-preview.png)

##  Установка и запуск

### 1. Клонировать репозиторий

- git clone https://github.com/Menethilzxc/quiz.git
- cd quiz

### 2. Установить зависимости

#### Фронтенд:

- cd frontend
- npm install
- npm run dev


#### Бэкенд:
- cd backend
- npm install
- node server.js

### 3. 3. Запустить MongoDB через Docker

- docker run -d --name mongo_new -p 27019:27017 -v mongo_data:/data/db mongo
