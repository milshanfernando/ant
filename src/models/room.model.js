const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    RoomNo: { type: String, required: true },
    allocationList: [
      {
        guestName: String,
        checkIn: Date,
        checkOut: Date,
      },
    ],
    active: { type: Boolean, default: true },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Case-insensitive unique index
RoomSchema.index(
  { RoomNo: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

module.exports = mongoose.model("Room", RoomSchema);
