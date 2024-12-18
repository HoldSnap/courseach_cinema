const jwt = require('jsonwebtoken');
const {User, Client} = require('../models');

// Функция для получения данных о пользователе по токену
async function getUserData(req, res) {
  // Получаем токен из заголовков авторизации
  const token = req.headers.authorization?.split(
      ' ')[1];  // Типичный формат: "Bearer <token>"

  if (!token) {
    return res.status(401).json({message: 'Токен не предоставлен'});
  }

  try {
    // Декодируем токен и получаем payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Находим клиента, используя userId из декодированного токена
    const client = await Client.findOne({
      where: {userId: decoded.id},  // Ищем клиента по userId
      include: {
        model: User,
        as: 'user',  // Подключаем пользователя, если нужно
        attributes: ['login']  // Выбираем нужные атрибуты
      }
    });

    if (!client) {
      return res.status(404).json({message: 'Клиент не найден'});
    }

    // Отправляем имя и баланс клиента
    return res.status(200).json({name: client.name, balance: client.balance});

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Ошибка при получении данных о пользователе',
      error: err.message
    });
  }
}

module.exports = {
  getUserData,
};
