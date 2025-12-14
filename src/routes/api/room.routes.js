const express = require("express");
const router = express.Router();
const roomController = require("../../controllers/room.controller");

router.post("/", roomController.createRoom);
router.get("/status", roomController.getRoomStatusByDate);

module.exports = router;
