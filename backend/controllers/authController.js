const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Administrator} = require('../models');

// Регистрация нового пользователя
async function register(req, res) {
  const {login, password, role} = req.body;

  try {
    // Проверяем, существует ли уже пользователь с таким логином
    const existingUser = await User.findOne({where: {login}});
    if (existingUser) {
      return res.status(400).json(
          {message: 'Пользователь с таким логином уже существует.'});
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const user = await User.create({
      login,
      password: hashedPassword,
      role,  // 'administrator', 'cashier', или 'client'
    });

    // Если роль администратора, создаем запись в таблице администратора
    if (role === 'administrator') {
      await Administrator.create({
        userId: user.id,
        name: 'Admin'  // Имя администратора можно передать через запрос
      });
    }

    return res.status(201).json(
        {message: 'Пользователь успешно зарегистрирован!'});
  } catch (error) {
    console.error(error);
    return res.status(500).json(
        {message: 'Ошибка при регистрации.', error: error.message});
  }
}

// Логин пользователя и получение JWT токена
async function login(req, res) {
  const {login, password} = req.body;

  if (!login || !password) {
    return res.status(400).json({message: 'Логин и пароль обязательны.'});
  }

  try {
    // Находим пользователя по логину
    const user = await User.findOne({where: {login}});
    if (!user) {
      return res.status(400).json(
          {message: 'Пользователь с таким логином не найден.'});
    }

    // Сравниваем пароли
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({message: 'Неверный пароль.'});
    }

    // Генерация JWT токена
    const token = jwt.sign(
        {id: user.id, role: user.role},  // payload (содержимое токена)
        process.env.JWT_SECRET_KEY,  // секретный ключ из .env
        {expiresIn: '1h'}            // время жизни токена
    );

    return res.status(200).json({token});
  } catch (error) {
    console.error(error);
    return res.status(500).json(
        {message: 'Ошибка при аутентификации.', error: error.message});
  }
}

module.exports = {
  register,
  login,
};
