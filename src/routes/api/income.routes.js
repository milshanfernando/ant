const express = require("express");
const router = express.Router();
const incomeController = require("../../controllers/income.controller");

router.post("/create", incomeController.createIncome);
router.get("/month", incomeController.getIncomeByMonth);
router.get("/:id", incomeController.getIncomeById);
router.get("/", incomeController.getIncome);

module.exports = router;
