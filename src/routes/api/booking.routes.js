const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/booking.controller");

// Create booking
router.post("/create", bookingController.createBooking);

// Allocate room for a booking
router.post("/:id/allocate", bookingController.allocateRoom);

module.exports = router;
