const express = require("express");
const router = express.Router();
const roomController = require("../../controllers/room.controller");

router.post("/", roomController.createRoom);
// Get all rooms
router.get("/", roomController.getAllRooms);
// Create rooms in bulk
router.post("/bulk", roomController.createRoomsBulk);
// Get available rooms for a date range
// Example: /rooms/available?checkIn=2025-12-15&checkOut=2025-12-20
router.get("/available", roomController.getAvailableRooms);

module.exports = router;
