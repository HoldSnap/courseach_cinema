// controllers/sessionController.js
const {Session, Film, Hall, Seat} = require('../models');
const {Op} = require('sequelize');

// Контроллер для создания сессии
async function createSession(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({message: 'Пользователь не авторизован.'});
    }

    if (req.user.role !== 'administrator') {
      return res.status(403).json(
          {message: 'Только администраторы могут создавать сессии.'});
    }

    const {startTime, endTime, ticketPrice, filmId, hallId} = req.body;

    const film = await Film.findByPk(filmId);
    if (!film) {
      return res.status(404).json({message: 'Фильм не найден.'});
    }

    const hall = await Hall.findByPk(hallId);
    if (!hall) {
      return res.status(404).json({message: 'Зал не найден.'});
    }

    const conflictingSession = await Session.findOne({
      where: {
        hallId: hallId,
        [Op.or]: [
          {
            startTime: {
              [Op.lt]: endTime,
            },
            endTime: {
              [Op.gt]: startTime,
            },
          },
        ],
      },
    });

    if (conflictingSession) {
      return res.status(400).json(
          {message: 'Зал занят в указанный промежуток времени.'});
    }

    const newSession = await Session.create({
      startTime,
      endTime,
      ticketPrice,
      filmId,
      hallId,
    });

    // Генерация мест на основе емкости зала
    const seats = [];
    for (let i = 1; i <= hall.capacity; i++) {
      seats.push({
        number: i,
        isAvailable: true,
        sessionId: newSession.id,
      });
    }

    await Seat.bulkCreate(seats);

    // Получение сгенерированных мест
    const generatedSeats =
        await Seat.findAll({where: {sessionId: newSession.id}});

    return res.status(201).json({session: newSession, seats: generatedSeats});
  } catch (error) {
    console.error(error);
    return res.status(500).json(
        {message: 'Ошибка при создании сессии.', error: error.message});
  }
}

// Контроллер для получения сессий
async function getSessions(req, res) {
  try {
    const {date} = req.query;  // Ожидаем параметр даты в формате YYYY-MM-DD

    // Формируем условие поиска
    let whereCondition = {};
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      whereCondition.startTime = {
        [Op.between]: [startOfDay, endOfDay],
      };
    }

    // Получаем сессии с связанными фильмами и залами
    const sessions = await Session.findAll({
      where: whereCondition,
      include: [
        {
          model: Film,
          as: 'film',
          attributes: ['id', 'title', 'duration', 'genre', 'premiereDate', 'pointUsageRestriction'],
        },
        {
          model: Hall,
          as: 'hall',
          attributes: ['id', 'name', 'capacity', 'hasComfortSeats'],
        },
        {
          model: Seat,
          as: 'seats',
          attributes: ['id', 'number', 'isAvailable'],
        },
      ],
      order: [['startTime', 'ASC']],
    });

    return res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    return res.status(500).json(
        {message: 'Ошибка при получении сессий.', error: error.message});
  }
}

module.exports = {
  createSession,
  getSessions,
};
