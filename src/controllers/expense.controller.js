const Expense = require("../models/expense.model");

exports.createExpense = async (req, res, next) => {
  try {
    const { amount, note, date, propertyName, reportType } = req.body;

    if (!amount || !date) {
      return res.status(400).json({ message: "Amount and date are required" });
    }

    const expense = new Expense({
      amount,
      note,
      date,
      propertyName,
      reportType,
    });

    await expense.save();

    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    next(error);
  }
};

// const Expense = require("../models/Expense");

// exports.getExpenses = async (req, res, next) => {
//   try {
//     const { month, startMonth, endMonth, propertyName, reportType } = req.query;

//     const filter = {};

//     /* ----------------------------
//        Report type filter
//     ----------------------------- */
//     if (reportType) {
//       filter.reportType = reportType;
//     }

//     /* ----------------------------
//        Property filter (multiple)
//     ----------------------------- */
//     if (propertyName) {
//       const properties = propertyName.split(",");
//       filter.propertyName = { $in: properties };
//     }

//     /* ----------------------------
//        Date filtering
//     ----------------------------- */

//     // Monthly
//     if (month) {
//       const startDate = new Date(`${month}-01`);
//       const endDate = new Date(startDate);
//       endDate.setMonth(endDate.getMonth() + 1);

//       filter.date = {
//         $gte: startDate,
//         $lt: endDate,
//       };
//     }

//     // Project / range
//     if (startMonth && endMonth) {
//       const startDate = new Date(`${startMonth}-01`);
//       const endDate = new Date(`${endMonth}-01`);
//       endDate.setMonth(endDate.getMonth() + 1);

//       filter.date = {
//         $gte: startDate,
//         $lt: endDate,
//       };
//     }

//     const expenses = await Expense.find(filter).sort({ date: -1 });

//     res.json(expenses);
//   } catch (error) {
//     next(error);
//   }
// };

exports.getExpenses = async (req, res, next) => {
  try {
    const {
      date, // 👈 daily (YYYY-MM-DD)
      month,
      startMonth,
      endMonth,
      propertyName,
      reportType,
    } = req.query;

    const filter = {};

    /* ----------------------------
       Report type
    ----------------------------- */
    if (reportType) {
      filter.reportType = reportType;
    }

    /* ----------------------------
       Property (multiple)
    ----------------------------- */
    if (propertyName) {
      filter.propertyName = {
        $in: propertyName.split(","),
      };
    }

    /* ----------------------------
       Date filtering (priority)
    ----------------------------- */

    // 1️⃣ DAILY
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      filter.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    // 2️⃣ MONTHLY
    else if (month) {
      const startDate = new Date(`${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      filter.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    // 3️⃣ PROJECT / RANGE
    else if (startMonth && endMonth) {
      const startDate = new Date(`${startMonth}-01`);
      const endDate = new Date(`${endMonth}-01`);
      endDate.setMonth(endDate.getMonth() + 1);

      filter.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

exports.getExpenseByMonth = async (req, res, next) => {
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

    const expenses = await Expense.find({
      date: { $gte: startDate, $lt: endDate },
    }).sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

exports.getExpenseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense record not found" });
    }

    res.json(expense);
  } catch (error) {
    next(error);
  }
};

exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    next(error);
  }
};
