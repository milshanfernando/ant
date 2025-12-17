const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/room.controller");

router.post("/", ctrl.createRoom);
router.put("/:id", ctrl.updateRoom);
router.patch("/:id/status", ctrl.updateRoomStatus);
router.get("/", ctrl.getRoomsByProperty);

module.exports = router;
