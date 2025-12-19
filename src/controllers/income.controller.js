const Income = require("../models/income.model");

/* ======================================================
   CREATE INCOME
====================================================== */
exports.createIncome = async (req, res, next) => {
  try {
    const { amount, bookingPlatform, date, propertyName, note } = req.body;

    if (!amount || !bookingPlatform || !date || !propertyName) {
      return res.status(400).json({
        message: "amount, bookingPlatform, date, and propertyName are required",
      });
    }

    const income = new Income({
      amount,
      bookingPlatform,
      date,
      propertyName,
      note,
    });

    await income.save();

    res.status(201).json({
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   GET INCOME (DATE / MONTH / PROPERTY / PLATFORM)
====================================================== */
exports.getIncome = async (req, res, next) => {
  try {
    const {
      date, // YYYY-MM-DD (daily)
      month, // YYYY-MM (monthly)
      propertyName, // single or comma separated
      bookingPlatform, // single or comma separated
    } = req.query;

    const filter = {};

    /* ----------------------------
       PROPERTY FILTER
    ----------------------------- */
    if (propertyName) {
      filter.propertyName = { $in: propertyName.split(",") };
    }

    /* ----------------------------
       BOOKING PLATFORM FILTER
    ----------------------------- */
    if (bookingPlatform) {
      filter.bookingPlatform = { $in: bookingPlatform.split(",") };
    }

    /* ----------------------------
       DATE FILTERING
    ----------------------------- */

    // DAILY
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      filter.date = { $gte: startDate, $lt: endDate };
    }

    // MONTHLY
    else if (month) {
      const startDate = new Date(`${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      filter.date = { $gte: startDate, $lt: endDate };
    }

    const income = await Income.find(filter).sort({ date: -1 });

    res.json(income);
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   GET ALL BOOKING PLATFORMS (BY DATE / MONTH)
====================================================== */
exports.getBookingPlatforms = async (req, res, next) => {
  try {
    const { date, month } = req.query;

    const filter = {};

    // DAILY
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      filter.date = { $gte: startDate, $lt: endDate };
    }

    // MONTHLY
    if (month) {
      const startDate = new Date(`${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      filter.date = { $gte: startDate, $lt: endDate };
    }

    const platforms = await Income.distinct("bookingPlatform", filter);

    res.json(platforms);
  } catch (error) {
    next(error);
  }
};
