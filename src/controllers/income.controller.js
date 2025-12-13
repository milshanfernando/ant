const Income = require("../models/income.model");

exports.createIncome = async (req, res, next) => {
  try {
    const { amount, note, date, propertyName, reportType } = req.body;

    if (!amount || !date) {
      return res.status(400).json({ message: "Amount and date are required" });
    }

    const income = new Income({ amount, note, date, propertyName, reportType });
    await income.save();

    res.status(201).json({ message: "Income added successfully", income });
  } catch (error) {
    next(error);
  }
};

exports.getIncomeByMonth = async (req, res, next) => {
  try {
    const { _month } = req.query; // e.g., "2025-12-01"

    if (!_month) {
      return res
        .status(400)
        .json({ message: "Month is required (YYYY-MM-DD)" });
    }

    const year = new Date(_month).getFullYear();
    const monthKey = _month.slice(5, 7) + "-01"; // e.g., "12-01"

    const monthRanges = {
      "01-01": { start: "YYYY-01-01", end: "YYYY-01-31" },
      "02-01": { start: "YYYY-02-01", end: "YYYY-02-28" },
      "03-01": { start: "YYYY-03-01", end: "YYYY-03-31" },
      "04-01": { start: "YYYY-04-01", end: "YYYY-04-30" },
      "05-01": { start: "YYYY-05-01", end: "YYYY-05-31" },
      "06-01": { start: "YYYY-06-01", end: "YYYY-06-30" },
      "07-01": { start: "YYYY-07-01", end: "YYYY-07-31" },
      "08-01": { start: "YYYY-08-01", end: "YYYY-08-31" },
      "09-01": { start: "YYYY-09-01", end: "YYYY-09-30" },
      "10-01": { start: "YYYY-10-01", end: "YYYY-10-31" },
      "11-01": { start: "YYYY-11-01", end: "YYYY-11-30" },
      "12-01": { start: "YYYY-12-01", end: "YYYY-12-31" },
    };

    if (!monthRanges[monthKey]) {
      return res.status(400).json({ message: "Invalid month" });
    }

    const startDate = new Date(
      monthRanges[monthKey].start.replace("YYYY", year)
    );
    const endDate = new Date(monthRanges[monthKey].end.replace("YYYY", year));

    const income = await Income.find({
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });

    res.json(income);
  } catch (error) {
    next(error);
  }
};

exports.getIncome = async (req, res, next) => {
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
       Date filtering (priority based)
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

    const income = await Income.find(filter).sort({ date: -1 });

    res.json(income);
  } catch (error) {
    next(error);
  }
};

// exports.getIncome = async (req, res, next) => {
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
//       const properties = propertyName.split(","); // "A,B,C" → ["A","B","C"]
//       filter.propertyName = { $in: properties };
//     }

//     /* ----------------------------
//        Date filtering
//     ----------------------------- */

//     // 1️⃣ Monthly report (from <input type="month">)
//     if (month) {
//       const startDate = new Date(`${month}-01`);
//       const endDate = new Date(startDate);
//       endDate.setMonth(endDate.getMonth() + 1);

//       filter.date = {
//         $gte: startDate,
//         $lt: endDate,
//       };
//     }

//     // 2️⃣ Project / custom range
//     if (startMonth && endMonth) {
//       const startDate = new Date(`${startMonth}-01`);
//       const endDate = new Date(`${endMonth}-01`);
//       endDate.setMonth(endDate.getMonth() + 1);

//       filter.date = {
//         $gte: startDate,
//         $lt: endDate,
//       };
//     }

//     const income = await Income.find(filter).sort({ date: -1 });

//     res.json(income);
//   } catch (error) {
//     next(error);
//   }
// };

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

// testing
