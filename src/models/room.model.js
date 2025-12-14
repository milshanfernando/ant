const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNo: { type: String, unique: true },
  roomType: { type: String, enum: ["SINGLE", "DOUBLE", "FAMILY"] },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Room", RoomSchema);
