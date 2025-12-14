const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/booking.controller");

// Create booking
router.post("/", bookingController.createBooking);

// Get all bookings
router.get("/", bookingController.getBookings);

// Allocate room
router.post("/allocate-room", bookingController.allocateRoom);

// Check-in
router.patch("/:bookingId/check-in", bookingController.checkIn);

// Check-out
router.patch("/:bookingId/check-out", bookingController.checkOut);

module.exports = router;
