// routes/seatRoutes.js
const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');


router.get('/', seatController.getAllSeats);


router.get('/session/:sessionId', seatController.getSeatsBySession);


router.get('/availability', seatController.getSeatAvailability);

module.exports = router;
