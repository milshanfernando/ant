const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    guestName: { type: String, required: true },
    bookingThrough: String,
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: String,
    assignRoom: String,
    allocatedRoom: { type: Boolean, default: false },
    date: Date,
    amount: Number,
    refTmg: String,
    phoneNumber: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
