const jwt = require('jsonwebtoken');

// Middleware для проверки JWT токена
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(
      ' ')[1];  // Извлекаем токен из заголовка Authorization

  if (!token) {
    return res.status(401).json(
        {message: 'Нет токена. Пользователь не авторизован.'});
  }

  // Проверка токена с использованием секретного ключа
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({message: 'Неверный токен.'});
    }

    // Сохраняем информацию о пользователе в объекте req.user
    req.user = decoded;
    next();  // Передаем управление дальше (к следующему middleware или
             // контроллеру)
  });
}

module.exports = authenticateToken;
