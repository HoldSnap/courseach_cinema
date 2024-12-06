// middleware/clientMiddleware.js
const {Client} = require('../models');

/**
 * Middleware для проверки, что аутентифицированный пользователь является
 * клиентом.
 */
async function verifyClient(req, res, next) {
  try {
    // Предполагается, что authenticateToken уже был вызван и req.user содержит
    // информацию о пользователе
    const userId = req.user.id;  // Измените поле, если ваше поле отличается

    // Найдите клиента, связанного с пользователем
    const client = await Client.findOne({where: {userId}});

    if (!client) {
      return res.status(403).json(
          {message: 'Пользователь не является клиентом.'});
    }

    // Прикрепите клиентскую информацию к объекту req для дальнейшего
    // использования
    req.client = client;

    next();  // Передайте управление следующему middleware или контроллеру
  } catch (error) {
    console.error('Ошибка в verifyClient middleware:', error);
    res.status(500).json({message: 'Внутренняя ошибка сервера.'});
  }
}

module.exports = verifyClient;
