// middleware/clientMiddleware.js
const {Client} = require('../models');

/**
 * Middleware для проверки, что аутентифицированный пользователь является
 * клиентом.
 */
async function verifyClient(req, res, next) {
  try {

    const userId = req.user.id;  

    const client = await Client.findOne({where: {userId}});

    if (!client) {
      return res.status(403).json(
          {message: 'Пользователь не является клиентом.'});
    }

 
    req.client = client;

    next();  
  } catch (error) {
    console.error('Ошибка в verifyClient middleware:', error);
    res.status(500).json({message: 'Внутренняя ошибка сервера.'});
  }
}

module.exports = verifyClient;
