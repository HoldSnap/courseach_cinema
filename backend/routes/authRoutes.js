const express = require('express');
const router = express.Router();
const {register, login} =
    require('../controllers/authController');  // Импортируем контроллеры для
                                               // регистрации и логина

// Роут для регистрации
router.post('/register', register);

// Роут для логина (получение токена)
router.post('/login', login);

module.exports = router;
