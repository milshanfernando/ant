// models/operationalCost.model.js
const mongoose = require("mongoose");

const operationalCostSchema = new mongoose.Schema(
  {
    // propertyName: {
    //   type: String,
    //   required: true,
    //   index: true,
    // },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: ["utility", "laundry", "salary", "maintenance", "other"],
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    costDate: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OperationalCost", operationalCostSchema);
