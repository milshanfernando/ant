const express = require("express");
const router = express.Router();
const {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  getAvailableRooms,
} = require("../../controllers/room.controller");

router.post("/", createRoom);
router.get("/", getRooms);
router.get("/available", getAvailableRooms);
router.get("/:id", getRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;
