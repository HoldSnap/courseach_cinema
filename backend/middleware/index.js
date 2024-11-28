const authenticate = require('./authMiddleware');
const errorHandler =
    require('./errorMiddleware');  // Например, для обработки ошибок

module.exports = {
  authenticate,
  errorHandler,
};
