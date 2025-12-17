const express = require("express");
const router = express.Router();

// Your existing routes
const itemRouter = require("./items.route");
const invoiceRouter = require("./invoice.route");

// New routes you wanted (same structure)
const incomeRouter = require("./income.routes");
const expenseRouter = require("./expense.routes");
const roomRouter = require("./room.routes");
const reservationRouter = require("./reservation.routes");
const operationalCost = require("./operationalCost.routes");
// const roomRouter = require("./room.route");

// Attach routes
router.use("/items", itemRouter);
router.use("/invoices", invoiceRouter);
router.use("/income", incomeRouter);
router.use("/expenses", expenseRouter);
router.use("/rooms", roomRouter);
router.use("/reservations", reservationRouter);
router.use("/operational-costs", operationalCost);

// router.use("/rooms", roomRouter);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const itemRouter = require("./items.route");
// const invoiceRouter = require("./invoice.route");

// router.use("/items", itemRouter);
// router.use("/invoices", invoiceRouter);

// module.exports = router;
