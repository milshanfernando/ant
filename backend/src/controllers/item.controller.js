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

exports.list = async (req, res, next) => {
  try {
    const { sortBy = "category", order = "desc" } = req.query;
    const query = Item.find({})
      .sort({ [sortBy]: order })
      .select("-__v");

    const items = await query.exec();

    return res.status(200).json({ items });
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { searchBy = "name", searchKey } = req.query;
    if (!searchKey) {
      return res.status(400).json({ message: "Search keywords are required " });
    }

    const items = await Item.find({
      [searchBy]: { $regex: searchKey, $options: "i" },
    }).select("-__v");

    return res.status(200).json({ items });
  } catch (error) {
    next(error);
  }
};
