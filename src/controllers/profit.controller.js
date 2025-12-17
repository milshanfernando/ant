const Reservation = require("../models/Reservation");
const OperationalCost = require("../models/operationalCost.model");

exports.getProfitReport = async (req, res) => {
  const { propertyName, date, month } = req.query;

  if (!propertyName)
    return res.status(400).json({ message: "propertyName required" });

  let start, end;

  if (date) {
    start = new Date(date);
    end = new Date(date);
    end.setHours(23, 59, 59, 999);
  } else if (month) {
    start = new Date(`${month}-01`);
    end = new Date(start);
    end.setMonth(end.getMonth() + 1);
  }

  /* ================= INCOME ================= */
  const income = await Reservation.find({
    propertyName,
    paymentStatus: "paid",
    paymentDate: { $gte: start, $lte: end },
  });

  const totalIncome = income.reduce((s, r) => s + (r.amount || 0), 0);

  /* ================= EXPENSES ================= */
  const expenses = await OperationalCost.find({
    propertyName,
    costDate: { $gte: start, $lte: end },
  });

  const expenseByType = {};
  let totalExpenses = 0;

  expenses.forEach((e) => {
    totalExpenses += e.amount;
    expenseByType[e.category] = (expenseByType[e.category] || 0) + e.amount;
  });

  res.json({
    income,
    expenses,
    expenseByType,
    totalIncome,
    totalExpenses,
    profit: totalIncome - totalExpenses,
  });
};
