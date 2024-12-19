const {Ticket, Seat, Session, sequelize} = require('../models');

const purchaseTicket = async (req, res) => {
  const {sessionId, seatId} = req.body;  
  const clientId = req.client.id;  // Получаем clientId из middleware

  try {
    const result = await sequelize.transaction(async (t) => {
      const session = await Session.findByPk(sessionId, {transaction: t});
      if (!session) {
        throw new Error('Session not found');
      }

      const seat = await Seat.findOne({
        where: {
          id: seatId,
          sessionId: sessionId
        }, 
        transaction: t,
      });
      if (!seat) {
        throw new Error('Seat not found in the specified session');
      }

      if (!seat.isAvailable) {
        throw new Error('Seat is already booked');
      }

      const existingTicket = await Ticket.findOne({
        where: {sessionId, seatId},
        transaction: t,
      });
      if (existingTicket) {
        throw new Error('Seat already booked for this session');
      }

      const ticketPrice = parseFloat(session.ticketPrice);
      const clientBalance = parseFloat(req.client.balance);

      if (isNaN(clientBalance) || isNaN(ticketPrice) ||
          clientBalance < ticketPrice) {
        throw new Error('Insufficient balance');
      }

      const ticket = await Ticket.create(
          {
            sessionId,
            seatId,
            clientId,
            price: ticketPrice,
            reservationStatus: 'paid',
          },
          {transaction: t});

      seat.isAvailable = false;
      await seat.save({transaction: t});

      const updatedBalance = clientBalance - ticketPrice;
      req.client.balance =
          updatedBalance.toFixed(2);  
      await req.client.save({transaction: t});

      return ticket;
    });

    res.status(201).json(
        {message: 'Ticket purchased successfully', ticket: result});
  } catch (error) {
    console.error(
        `Ошибка при бронировании билета (Session ID: ${
            req.body.sessionId}, Seat ID: ${req.body.seatId}):`,
        error);
    res.status(400).json({error: error.message});
  }
};

module.exports = {
  purchaseTicket,
};
