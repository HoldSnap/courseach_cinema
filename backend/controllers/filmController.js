const {Film} = require('../models');

// Контроллер для создания фильма
async function createFilm(req, res) {
  try {
    // Проверяем, что объект user существует в запросе
    if (!req.user) {
      return res.status(401).json({message: 'Пользователь не авторизован.'});
    }

    // Данные фильма, переданные в запросе
    const {title, duration, genre, premiereDate, pointUsageRestriction} =
        req.body;

    // Проверка роли администратора (только администраторы могут создавать
    // фильмы)
    if (req.user.role !== 'administrator') {
      return res.status(403).json(
          {message: 'Только администраторы могут создавать фильмы.'});
    }

    // Создание нового фильма
    const newFilm = await Film.create(
        {title, duration, genre, premiereDate, pointUsageRestriction});

    // Ответ с информацией о созданном фильме
    return res.status(201).json(newFilm);
  } catch (error) {
    console.error(error);
    return res.status(500).json(
        {message: 'Ошибка при создании фильма.', error: error.message});
  }
}

module.exports = {createFilm};
