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

exports.view = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    const item = await Item.findById(id).select("-__v");

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({ item });
  } catch (error) {
    next(error);
  }
};
