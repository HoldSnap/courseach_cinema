const jwt = require('jsonwebtoken');
const {User, Client} = require('../models');

// Получение данных о пользователе по токену (имя и баланс)
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
      where: { userId: decoded.id },  // Ищем клиента по userId
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

// Обновление имени и аватара пользователя
async function updateProfile(req, res) {
  const {name, avatar} = req.body;  // Извлекаем новые значения

  // Получаем токен из заголовков запроса
  const token = req.headers.authorization?.split(
      ' ')[1];  // Извлекаем токен из заголовка Authorization
  if (!token) {
    return res.status(401).json(
        {message: 'Токен не найден. Пожалуйста, авторизуйтесь.'});
  }

  try {
    // Декодируем токен и получаем ID пользователя
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    // Находим клиента, связанного с этим пользователем
    const client = await Client.findOne({where: {userId: userId}});
    if (!client) {
      return res.status(404).json({message: 'Клиент не найден.'});
    }

    // Обновляем имя и аватар
    if (name) client.name = name;
    if (avatar) client.avatar = avatar;

    await client.save();  // Сохраняем изменения

    return res.status(200).json({message: 'Профиль обновлен', client});
  } catch (error) {
    console.error(error);
    return res.status(500).json(
        {message: 'Ошибка при обновлении профиля', error: error.message});
  }
}

module.exports = {
  getUserData,    // Добавили новый метод
  updateProfile,  // Добавили новый метод
};
