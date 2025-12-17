const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    guestName: { type: String, required: true },
    idPassport: String,
    mobile: String,
    email: String,
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    checkInTime: String,
    checkOutTime: String,
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    paymentDate: Date,
    status: {
      type: String,
      enum: ["booked", "checked-in", "checked-out", "cancelled"],
      default: "booked",
    },
    propertyName: { type: String, required: true },
    room: { type: String, required: true },
    refImage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
