const express = require("express");
const router = express.Router();

const itemRouter = require("./items.route");
const invoiceRouter = require("./invoice.route");

router.use("/items", itemRouter);
router.use("/invoices", invoiceRouter);

module.exports = router;
