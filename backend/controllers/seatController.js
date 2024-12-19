// controllers/seatController.js
const {Seat, Session, Ticket} = require('../models');
const {Op} = require('sequelize');

async function getAllSeats(req, res) {
  try {
    const seats = await Seat.findAll({
      include: [
        {
          model: Session,
          as: 'session',
          attributes: ['id', 'startTime', 'endTime'],
        },
        {
          model: Ticket,
          as: 'tickets',
          attributes: ['id', 'reservationStatus'],
        },
      ],
    });
    res.status(200).json(seats);
  } catch (error) {
    console.error('Ошибка при получении мест:', error);
    res.status(500).json({message: 'Внутренняя ошибка сервера'});
  }
}

async function getSeatsBySession(req, res) {
  const {sessionId} = req.params;
  try {
    const seats = await Seat.findAll({
      where: { sessionId },
      include: [
        {
          model: Ticket,
          as: 'tickets',
          attributes: ['id', 'reservationStatus'],
        },
      ],
    });
    res.status(200).json(seats);
  } catch (error) {
    console.error(`Ошибка при получении мест для сессии ${sessionId}:`, error);
    res.status(500).json({message: 'Внутренняя ошибка сервера'});
  }
}

// Контроллер для получения доступности мест по sessionId
async function getSeatAvailability(req, res) {
  const {sessionId} = req.query;
  if (!sessionId) {
    return res.status(400).json({message: 'Необходим параметр sessionId'});
  }

  try {
    const seats = await Seat.findAll({
      where: { sessionId },
      include: [
        {
          model: Ticket,
          as: 'tickets',
          attributes: ['id', 'reservationStatus'],
        },
      ],
    });

    const formattedSeats = seats.map(
        seat => ({
          id: seat.id,
          number: seat.number,
          isAvailable: seat.tickets.length === 0 ||
              seat.tickets.some(ticket => ticket.reservationStatus !== 'paid'),
          sessionId: seat.sessionId,
        }));

    res.status(200).json(formattedSeats);
  } catch (error) {
    console.error('Ошибка при получении доступности мест:', error);
    res.status(500).json({message: 'Внутренняя ошибка сервера'});
  }
}

module.exports = {
  getAllSeats,
  getSeatsBySession,
  getSeatAvailability,
};
