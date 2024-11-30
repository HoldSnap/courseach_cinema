const express = require('express');
const router = express.Router();
const {createSession} = require('../controllers/sessionController');
const authenticateToken = require('../middleware/authMiddleware');

// Маршрут для создания сессии
router.post('/', authenticateToken, createSession);

module.exports = router;
