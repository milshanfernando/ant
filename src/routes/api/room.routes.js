const express = require("express");
const router = express.Router();
const roomController = require("../../controllers/room.controller");

router.post("/create", roomController.createRoom);
router.post("/bulk", roomController.createRoomsBulk);
router.get("/available", roomController.getAvailableRooms);
router.get("/", roomController.getAllRooms);

module.exports = router;
