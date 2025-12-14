const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    guestName: String,
    phoneNumber: String,

    bookingThrough: {
      type: String,
      enum: ["BOOKING", "AGODA", "AIRBNB", "EXPEDIA", "DIRECT"],
    },

    checkIn: Date,
    checkOut: Date,

    status: {
      type: String,
      enum: ["PENDING", "ALLOCATED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED"],
      default: "PENDING",
    },

    assignedRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },

    amount: Number,
    referenceNo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
