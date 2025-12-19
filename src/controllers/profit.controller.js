// const Reservation = require("../models/Reservation");
// const OperationalCost = require("../models/operationalCost.model");
// const Income = require("../models/income.model");

// exports.getProfitReport = async (req, res) => {
// try {
//   const { date, month } = req.query;
//   let start, end;
//   if (date) {
//     start = new Date(date);
//     start.setHours(0, 0, 0, 0);
//     end = new Date(date);
//     end.setHours(23, 59, 59, 999);
//   } else if (month) {
//     start = new Date(`${month}-01`);
//     end = new Date(start);
//     end.setMonth(end.getMonth() + 1);
//   } else {
//     return res.status(400).json({ message: "date or month is required" });
//   }
//   /* ================= DIRECT INCOME (RESERVATIONS) ================= */
//   const directIncomeList = await Reservation.find({
//     paymentStatus: "paid",
//     bookingPlatform: "direct", // 👈 IMPORTANT
//     paymentDate: { $gte: start, $lte: end },
//   });
//   const totalDirectIncome = directIncomeList.reduce(
//     (sum, r) => sum + (r.amount || 0),
//     0
//   );
//   /* ================= PLATFORM INCOME ================= */
//   const platformIncomeList = await Income.find({
//     date: { $gte: start, $lte: end },
//   });
//   const totalPlatformIncome = platformIncomeList.reduce(
//     (sum, i) => sum + (i.amount || 0),
//     0
//   );
//   /* ================= TOTAL INCOME ================= */
//   const totalIncome = totalDirectIncome + totalPlatformIncome;
//   /* ================= EXPENSES ================= */
//   const expenses = await OperationalCost.find({
//     costDate: { $gte: start, $lte: end },
//   });
//   let totalExpenses = 0;
//   const expenseByType = {};
//   expenses.forEach((e) => {
//     totalExpenses += e.amount;
//     expenseByType[e.category] = (expenseByType[e.category] || 0) + e.amount;
//   });
//   /* ================= RESPONSE ================= */
//   res.json({
//     period: date || month,
//     income: {
//       direct: {
//         list: directIncomeList,
//         total: totalDirectIncome,
//       },
//       platforms: {
//         list: platformIncomeList,
//         total: totalPlatformIncome,
//       },
//       totalIncome,
//     },
//     expenses: {
//       list: expenses,
//       expenseByType,
//       totalExpenses,
//     },
//     profit: totalIncome - totalExpenses,
//   });
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ message: "Failed to generate profit report" });
// }
// };

// const Reservation = require("../models/Reservation");
// const OperationalCost = require("../models/operationalCost.model");

// exports.getProfitReport = async (req, res) => {
//   const { date, month } = req.query;

//   // if (!propertyName)
//   //   return res.status(400).json({ message: "propertyName required" });

//   let start, end;

//   if (date) {
//     start = new Date(date);
//     end = new Date(date);
//     end.setHours(23, 59, 59, 999);
//   } else if (month) {
//     start = new Date(`${month}-01`);
//     end = new Date(start);
//     end.setMonth(end.getMonth() + 1);
//   }

//   /* ================= INCOME ================= */
//   const income = await Reservation.find({
//     paymentStatus: "paid",
//     paymentDate: { $gte: start, $lte: end },
//   });

//   const totalIncome = income.reduce((s, r) => s + (r.amount || 0), 0);

//   /* ================= EXPENSES ================= */
//   const expenses = await OperationalCost.find({
//     costDate: { $gte: start, $lte: end },
//   });

//   const expenseByType = {};
//   let totalExpenses = 0;

//   expenses.forEach((e) => {
//     totalExpenses += e.amount;
//     expenseByType[e.category] = (expenseByType[e.category] || 0) + e.amount;
//   });

//   res.json({
//     income,
//     expenses,
//     expenseByType,
//     totalIncome,
//     totalExpenses,
//     profit: totalIncome - totalExpenses,
//   });
// };
