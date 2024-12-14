// routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const {createSession, getSessions} =
    require('../controllers/sessionController');
const authenticateToken = require('../middleware/authMiddleware');

// Маршрут для создания сессии (только для администраторов)
router.post('/', authenticateToken, createSession);

// Маршрут для получения сессий (доступен для всех пользователей)
router.get('/', getSessions);

module.exports = router;
