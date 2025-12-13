const express = require("express");
const router = express.Router();
const expenseController = require("../../controllers/expense.controller");

router.post("/create", expenseController.createExpense);
router.get("/month", expenseController.getExpenseByMonth);
router.get("/:id", expenseController.getExpenseById);
router.get("/", expenseController.getExpenses);

module.exports = router;
