const Item = require("../models/item.model");

exports.create = async (req, res, next) => {
  try {
    const itemData = req.body;
    const item = new Item(itemData);
    await item.save();
    return res.status(201).json({ item });
  } catch (error) {
    next(error);
  }
};
