const jwt = require('jsonwebtoken');
const {User, Client} = require('../models');

async function getUserData(req, res) {
  const token = req.headers.authorization?.split(
      ' ')[1]; 

  if (!token) {
    return res.status(401).json({message: 'Токен не предоставлен'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const client = await Client.findOne({
        where: { userId: decoded.id }, 
        include: {
          model: User,
          as: 'user',  
          attributes: ['login', 'role'],  
        },
      });

    if (!client) {
      return res.status(404).json({message: 'Клиент не найден'});
    }

    return res.status(200).json({
      name: client.name,
      balance: client.balance,
      avatar: client.avatar,  
      role: client.user.role, 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Ошибка при получении данных о пользователе',
      error: err.message,
    });
  }
}


async function updateProfile(req, res) {
  const {name, avatar} = req.body;  

  const token = req.headers.authorization?.split(
      ' ')[1]; 
  if (!token) {
    return res.status(401).json(
        {message: 'Токен не найден. Пожалуйста, авторизуйтесь.'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const client = await Client.findOne({where: {userId: userId}});
    if (!client) {
      return res.status(404).json({message: 'Клиент не найден.'});
    }

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
  getUserData,    
  updateProfile, 
};
