// routes/ticketRoutes.js
const express = require('express');
const {purchaseTicket} = require('../controllers/ticketController');
const authenticateToken = require('../middleware/authMiddleware');
const verifyClient =
    require('../middleware/clientMiddleware');  // Импортируем новое middleware

const router = express.Router();

// Защищенный маршрут для бронирования билета (проверка токена и клиента)
router.post(
    '/book', authenticateToken, verifyClient,
    purchaseTicket);  // /api/tickets/book

module.exports = router;
