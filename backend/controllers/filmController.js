const {Film} = require('../models');

async function createFilm(req, res) {
  try {
    // Проверяем, что объект user существует в запросе
    if (!req.user) {
      return res.status(401).json({message: 'Пользователь не авторизован.'});
    }

    const {title, duration, genre, premiereDate, pointUsageRestriction} =
        req.body;


    if (req.user.role !== 'administrator') {
      return res.status(403).json(
          {message: 'Только администраторы могут создавать фильмы.'});
    }

    const newFilm = await Film.create(
        {title, duration, genre, premiereDate, pointUsageRestriction});

    return res.status(201).json(newFilm);
  } catch (error) {
    console.error(error);
    return res.status(500).json(
        {message: 'Ошибка при создании фильма.', error: error.message});
  }
}

module.exports = {createFilm};
