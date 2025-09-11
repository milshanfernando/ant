const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceItemSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item", // Reference to your Item model
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const InvoiceSchema = new Schema(
  {
    invoiceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    customer: {
      name: { type: String, required: true, trim: true },
      telephone: { type: String, trim: true },
      email: { type: String, trim: true },
      address: { type: String, trim: true },
    },
    items: [InvoiceItemSchema],
    subTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Credit", "Other"],
      default: "Cash",
    },
    status: {
      type: String,
      enum: ["Paid", "Unpaid", "Pending"],
      default: "Unpaid",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
