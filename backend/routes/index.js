// routes/index.js
const express = require('express');
const filmRoutes = require('./filmRoutes');
const authRoutes = require('./authRoutes');
const sessionRoutes = require('./sessionRoutes');
const ticketRoutes = require('./ticketRoutes');
const seatRoutes = require('./seatRoutes');  // Роуты для мест

const router = express.Router();

// Подключаем роуты
router.use('/films', filmRoutes);  // Маршруты для фильмов
router.use('/auth', authRoutes);  // Маршруты для аутентификации
router.use('/sessions', sessionRoutes);  // Маршруты для сессий
router.use('/tickets', ticketRoutes);  // Маршруты для билетов
router.use('/seats', seatRoutes);      // Маршруты для мест

module.exports = router;
