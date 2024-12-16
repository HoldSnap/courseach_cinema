// server.js или app.js
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const {authenticate, errorHandler} =
    require('./middleware');         // Импортируем middleware
const routes = require('./routes');  // Импортируем общий роутер

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Замените на адрес вашего фронтенда
                                    // (например, порт Vite)
  credentials: true,  // Разрешить передачу учётных данных (куки)
}));

// Middleware для парсинга тела запроса
app.use(bodyParser.json());

// Роуты для всех запросов
app.use('/api', routes);  // Все роуты находятся в /api

// Общий middleware для обработки ошибок
app.use(errorHandler);

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
