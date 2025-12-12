const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    note: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },

    // ➕ New fields
    propertyName: {
      type: String,
      required: true,
      trim: true,
    },
    reportType: {
      type: String,
      enum: ["monthly", "project"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
