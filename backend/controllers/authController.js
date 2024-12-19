// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Client} =
    require('../models');  

async function register(req, res) {
  const {login, password, name} = req.body; 

  try {
    const existingUser = await User.findOne({where: {login}});
    if (existingUser) {
      return res.status(400).json(
          {message: 'Пользователь с таким логином уже существует.'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      login,
      password: hashedPassword,
      role: 'client',  
    });

    await Client.create({
      userId: user.id,
      name: name || 'Client',  
                               
      balance: 100.00,  
                       
    });

    return res.status(201).json({message: 'Клиент успешно зарегистрирован!'});
  } catch (error) {
    console.error(error);
    return res.status(500).json(
        {message: 'Ошибка при регистрации.', error: error.message});
  }
}

async function login(req, res) {
  const {login, password} = req.body;

  if (!login || !password) {
    return res.status(400).json({message: 'Логин и пароль обязательны.'});
  }

  try {
    const user = await User.findOne({where: {login}});
    if (!user) {
      return res.status(400).json(
          {message: 'Пользователь с таким логином не найден.'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({message: 'Неверный пароль.'});
    }

    const token = jwt.sign(
        {id: user.id, role: user.role}, 
        process.env.JWT_SECRET_KEY, 
        {expiresIn: '1h'}           
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
