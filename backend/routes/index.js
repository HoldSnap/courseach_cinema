// routes/index.js
const express = require('express');
const filmRoutes = require('./filmRoutes');
const authRoutes = require('./authRoutes');  // Роуты для аутентификации
const sessionRoutes = require('./sessionRoutes');
const ticketRoutes = require('./ticketRoutes');  // Роуты для билетов

const router = express.Router();

// Подключаем роуты
router.use('/films', filmRoutes);  // Все маршруты, связанные с фильмами
router.use('/auth', authRoutes);  // Все маршруты, связанные с аутентификацией
router.use('/sessions', sessionRoutes);  // Все маршруты, связанные с сессиями
router.use('/tickets', ticketRoutes);  // Все маршруты, связанные с билетами

module.exports = router;
