const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  assignGuestToRoom,
} = require("../../controllers/booking.controller");

router.post("/", createBooking);
router.get("/", getBookings);
router.get("/:id", getBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.post("/:id/assign-room", assignGuestToRoom);

module.exports = router;
