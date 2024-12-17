// routes/seatRoutes.js
const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

// Получить все места
router.get('/', seatController.getAllSeats);

// Получить места по sessionId
router.get('/session/:sessionId', seatController.getSeatsBySession);

// Получить доступность мест по sessionId
// Пример запроса: GET /seats/availability?sessionId=1
router.get('/availability', seatController.getSeatAvailability);

module.exports = router;
