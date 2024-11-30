const express = require('express');
const router = express.Router();

// Импортируем роуты для фильмов и пользователей
const filmRoutes = require('./filmRoutes');
// const userRoutes = require('./userRoutes');
const authRoutes =
    require('./authRoutes');  // Импортируем роуты для аутентификации
const sessionRoutes = require('./sessionRoutes');

// Подключаем роуты
router.use('/films', filmRoutes);  // Все маршруты, связанные с фильмами
// router.use('/users', userRoutes);  // Все маршруты, связанные с
// пользователями
router.use('/auth', authRoutes);  // Все маршруты, связанные с аутентификацией
router.use('/sessions', sessionRoutes);

module.exports = router;
