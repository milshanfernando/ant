// controllers/operationalCost.controller.js
const OperationalCost = require("../models/operationalCost.model");

/* ================= CREATE COST ================= */
exports.createCost = async (req, res) => {
  try {
    const { propertyName, amount, category, description, costDate } = req.body;

    if (!propertyName || !amount || !category || !costDate) {
      return res.status(400).json({
        message: "propertyName, amount, category and costDate are required",
      });
    }

    const cost = await OperationalCost.create({
      propertyName,
      amount,
      category,
      description,
      costDate,
    });

    res.status(201).json(cost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET COSTS ================= */
exports.getCosts = async (req, res) => {
  try {
    const { propertyName, date, month } = req.query;

    if (!propertyName) {
      return res.status(400).json({
        message: "propertyName is required",
      });
    }

    let filter = { propertyName };

    // DAILY
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.costDate = { $gte: start, $lte: end };
    }

    // MONTHLY
    if (month) {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      filter.costDate = { $gte: start, $lt: end };
    }

    const costs = await OperationalCost.find(filter).sort({
      costDate: -1,
    });

    res.json(costs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= MONTHLY SUMMARY ================= */
exports.getCostSummary = async (req, res) => {
  try {
    const { propertyName, month } = req.query;

    if (!propertyName || !month) {
      return res.status(400).json({
        message: "propertyName and month are required",
      });
    }

    const start = new Date(`${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const summary = await OperationalCost.aggregate([
      {
        $match: {
          propertyName,
          costDate: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
