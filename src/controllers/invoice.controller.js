const Invoice = require("../models/invoice.model");
const Item = require("../models/item.model");

const generateInvoiceId = async () => {
  const count = await Invoice.countDocuments();
  const nextId = count + 1;
  const paddedId = String(nextId).padStart(5, "0");
  return `INV-${paddedId}`;
};

exports.createInvoice = async (req, res, next) => {
  try {
    const {
      customer,
      items,
      tax = 0,
      discount = 0,
      paymentMethod = "Cash",
      notes,
    } = req.body;

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Invoice must have at least one item." });
    }

    const invoiceItems = [];
    let subTotal = 0;

    for (const i of items) {
      const itemDoc = await Item.findById(i.item);
      if (!itemDoc) {
        return res.status(404).json({ message: `Item not found: ${i.item}` });
      }

      const total = itemDoc.price * i.quantity;
      subTotal += total;

      invoiceItems.push({
        item: itemDoc._id,
        name: itemDoc.name,
        quantity: i.quantity,
        price: itemDoc.price,
        total,
      });

      itemDoc.quantity -= i.quantity;
      await itemDoc.save();
    }

    const totalAmount = subTotal + tax - discount;
    const invoiceId = await generateInvoiceId();

    const invoice = new Invoice({
      invoiceId,
      customer,
      items: invoiceItems,
      subTotal,
      tax,
      discount,
      totalAmount,
      paymentMethod,
      notes,
    });

    await invoice.save();

    return res
      .status(201)
      .json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    next(error);
  }
};

exports.getInvoicesByMonth = async (req, res, next) => {
  try {
    const { _month } = req.query; // e.g. "2025-09-10"

    if (!_month) {
      return res
        .status(400)
        .json({ message: "Month is required (YYYY-MM-DD)" });
    }

    // Parse the given month
    const startDate = new Date(_month);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // move to next month test

    const invoices = await Invoice.find({
      createdAt: { $gte: startDate, $lt: endDate },
    }).sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    next(error);
  }
};
exports.getInvoiceById = async (req, res, next) => {
  try {
    const { id } = req.params; // invoice id from URL (e.g., /invoices/:id)

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  } catch (error) {
    next(error);
  }
};
