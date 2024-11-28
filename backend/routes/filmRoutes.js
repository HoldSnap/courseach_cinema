const express = require('express');
const {createFilm} = require('../controllers/filmController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Защищенный маршрут для создания фильма (проверка токена)
router.post('/', authenticateToken, createFilm);  // /api/films

module.exports = router;
