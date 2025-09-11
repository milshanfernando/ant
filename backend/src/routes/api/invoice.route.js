const express = require("express");
const router = express.Router();
const invoiceController = require("../../controllers/invoice.controller");

router.post("/create", invoiceController.createInvoice);
router.get("/month", invoiceController.getInvoicesByMonth);
router.get("/:id", invoiceController.getInvoiceById);

// router.get("/view/:id", invoiceController.viewInvoice);

// router.get("/list", invoiceController.listInvoices);

module.exports = router;
