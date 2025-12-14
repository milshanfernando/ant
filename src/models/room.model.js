const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  RoomNo: { type: String, required: true, unique: true },
  allocationList: [
    {
      guestName: String,
      checkIn: Date,
      checkOut: Date,
    },
  ],
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Room", RoomSchema);
