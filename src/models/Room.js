const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    propertyName: { type: String, required: true },
    room: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "occupied", "maintenance"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
