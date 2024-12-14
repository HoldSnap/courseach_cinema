// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Client} =
    require('../models');  // Импортируем только необходимые модели

// Регистрация нового клиента
async function register(req, res) {
  const {login, password, name} = req.body;  // Удалено поле 'role'

  try {
    // Проверяем, существует ли уже пользователь с таким логином
    const existingUser = await User.findOne({where: {login}});
    if (existingUser) {
      return res.status(400).json(
          {message: 'Пользователь с таким логином уже существует.'});
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя с ролью 'client'
    const user = await User.create({
      login,
      password: hashedPassword,
      role: 'client',  // Роль устанавливается автоматически
    });

    // Создаем запись в таблице клиента
    await Client.create({
      userId: user.id,
      name: name || 'Client',  // Имя клиента можно передать через запрос или
                               // использовать значение по умолчанию
      balance: 100.00,  // Начальный баланс клиента, можно задать по умолчанию
                        // или передать через запрос
    });

    return res.status(201).json({message: 'Клиент успешно зарегистрирован!'});
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
