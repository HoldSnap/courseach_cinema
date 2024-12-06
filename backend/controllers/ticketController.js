// controllers/ticketController.js
const {Ticket, Seat, Session, sequelize} = require('../models');

const purchaseTicket = async (req, res) => {
  const {sessionId, seatId} = req.body;  // Убрали clientId
  const clientId = req.client.id;  // Получаем clientId из middleware

  try {
    // Начало транзакции
    const result = await sequelize.transaction(async (t) => {
      // Проверка существования сессии
      const session = await Session.findByPk(sessionId, {transaction: t});
      if (!session) {
        throw new Error('Session not found');
      }

      // Проверка существования места
      const seat = await Seat.findOne({
        where: {id: seatId, hallId: session.hallId},
        transaction: t,
      });
      if (!seat) {
        throw new Error('Seat not found in the specified hall');
      }

      // Проверка доступности места для сессии
      if (!seat.isAvailable) {
        throw new Error('Seat is already booked');
      }

      // Проверка, что место не занято
      const existingTicket = await Ticket.findOne({
        where: {sessionId, seatId},
        transaction: t,
      });
      if (existingTicket) {
        throw new Error('Seat already booked for this session');
      }

      // Проверка баланса клиента
      if (parseFloat(req.client.balance) < parseFloat(session.ticketPrice)) {
        throw new Error('Insufficient balance');
      }

      // Создание билета
      const ticket = await Ticket.create(
          {
            sessionId,
            seatId,
            clientId,
            price: session.ticketPrice,
            reservationStatus: 'paid',
          },
          {transaction: t});

      // Обновление состояния места (занято)
      seat.isAvailable = false;
      await seat.save({transaction: t});

      // Обновление баланса клиента
      req.client.balance =
          parseFloat(req.client.balance) - parseFloat(session.ticketPrice);
      await req.client.save({transaction: t});

      return ticket;
    });

    res.status(201).json(
        {message: 'Ticket purchased successfully', ticket: result});
  } catch (error) {
    console.error('Ошибка при бронировании билета:', error);
    res.status(400).json({error: error.message});
  }
};

module.exports = {
  purchaseTicket,
};
