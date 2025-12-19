const express = require("express");
const router = express.Router();
const incomeController = require("../../controllers/income.controller");

/* =========================
   CREATE INCOME
========================= */
router.post("/", incomeController.createIncome);

/* =========================
   GET INCOME
   - date=YYYY-MM-DD
   - month=YYYY-MM
   - propertyName=A,B
   - bookingPlatform=Airbnb,Booking.com
========================= */
router.get("/", incomeController.getIncome);

/* =========================
   GET ALL BOOKING PLATFORMS
   - date=YYYY-MM-DD
   - month=YYYY-MM
========================= */
router.get("/platforms", incomeController.getBookingPlatforms);

/* =========================
   GET INCOME BY ID
========================= */
router.get("/:id", incomeController.getIncomeById);

module.exports = router;
