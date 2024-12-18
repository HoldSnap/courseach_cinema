const express = require('express');
const router = express.Router();
const {register, login} =
    require('../controllers/authController');  // Импортируем контроллеры для
                                               // регистрации и логина
const {getUserData, updateProfile} = require(
    '../controllers/userController');  // Импортируем контроллеры для получения
                                       // и обновления данных пользователя

// Роут для регистрации
router.post('/register', register);

// Роут для логина (получение токена)
router.post('/login', login);

// Роут для получения данных пользователя по токену
router.get('/user/data', getUserData);

router.post('/user/update-profile', updateProfile);

module.exports = router;
