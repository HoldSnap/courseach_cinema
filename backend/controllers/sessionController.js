const {Session, Film, Hall} = require('../models');
const {Op} = require('sequelize');
// Контроллер для создания сессии
async function createSession(req, res) {
  try {
    // Проверяем, что объект user существует в запросе
    if (!req.user) {
      return res.status(401).json({message: 'Пользователь не авторизован.'});
    }

    // Проверка роли администратора (только администраторы могут создавать
    // сессии)
    if (req.user.role !== 'administrator') {
      return res.status(403).json(
          {message: 'Только администраторы могут создавать сессии.'});
    }

    // Данные сессии, переданные в запросе
    const {startTime, endTime, ticketPrice, filmId, hallId} = req.body;

    // Проверяем, что фильм с таким ID существует
    const film = await Film.findByPk(filmId);
    if (!film) {
      return res.status(404).json({message: 'Фильм не найден.'});
    }

    // Проверяем, что зал с таким ID существует
    const hall = await Hall.findByPk(hallId);
    if (!hall) {
      return res.status(404).json({message: 'Зал не найден.'});
    }

    // Проверка, что зал не занят в указанное время
    const conflictingSession = await Session.findOne({
      where: {
        hallId: hallId,
        // Проверяем пересечение времени с другими сессиями
        [Op.or]: [
          {
            startTime: {
              [Op.lt]: endTime,  // если начало сессии раньше конца новой сессии
            },
            endTime: {
              [Op.gt]:
                  startTime,  // и если конец сессии позже начала новой сессии
            },
          },
        ],
      },
    });

    if (conflictingSession) {
      return res.status(400).json({
        message: 'Зал занят в указанный промежуток времени.',
      });
    }

    // Создание новой сессии
    const newSession = await Session.create({
      startTime,
      endTime,
      ticketPrice,
      filmId,
      hallId,
    });

    // Ответ с информацией о созданной сессии
    return res.status(201).json(newSession);
  } catch (error) {
    console.error(error);
    return res.status(500).json(
        {message: 'Ошибка при создании сессии.', error: error.message});
  }
}

module.exports = {createSession};
