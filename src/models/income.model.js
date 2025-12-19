const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    bookingPlatform: {
      type: String,
      required: true,
      trim: true, // e.g. Booking.com, Airbnb, Walk-in
    },

    date: {
      type: Date,
      required: true,
    },

    propertyName: {
      type: String,
      required: true,
      trim: true,
    },

    note: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);
