const express = require('express');
const router = express.Router();
const {register, login} =
    require('../controllers/authController');  // Импортируем контроллеры для
                                               // регистрации и логина
const {getUserData} = require(
    '../controllers/userController');  // Импортируем новый контроллер для
                                       // получения данных пользователя

// Роут для регистрации
router.post('/register', register);

// Роут для логина (получение токена)
router.post('/login', login);

// Новый роут для получения данных пользователя по токену
router.get('/user/data', getUserData);

module.exports = router;
