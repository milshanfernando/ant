const Income = require("../models/income.model");

exports.createIncome = async (req, res, next) => {
  try {
    const { amount, note, date } = req.body;

    if (!amount || !date) {
      return res.status(400).json({ message: "Amount and date are required" });
    }

    const income = new Income({ amount, note, date });
    await income.save();

    res.status(201).json({ message: "Income added successfully", income });
  } catch (error) {
    next(error);
  }
};

exports.getIncomeByMonth = async (req, res, next) => {
  try {
    const { _month } = req.query;

    if (!_month) {
      return res
        .status(400)
        .json({ message: "Month is required (YYYY-MM-DD)" });
    }

    const startDate = new Date(_month);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const income = await Income.find({
      date: { $gte: startDate, $lt: endDate },
    }).sort({ date: -1 });

    res.json(income);
  } catch (error) {
    next(error);
  }
};

exports.getIncomeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const income = await Income.findById(id);

    if (!income) {
      return res.status(404).json({ message: "Income record not found" });
    }

    res.json(income);
  } catch (error) {
    next(error);
  }
};

exports.getAllIncome = async (req, res, next) => {
  try {
    const income = await Income.find().sort({ createdAt: -1 });
    res.json(income);
  } catch (error) {
    next(error);
  }
};
