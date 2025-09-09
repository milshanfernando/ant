const Item = require("../models/item.model");
const config = require("../services/config");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

exports.create = async (req, res, next) => {
  try {
    const { name, price, category, quantity, supplier, status } = req.body;

    let imageUrl = "";
    if (req.file) {
      // upload to cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "items" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    // create item with image URL
    const item = new Item({
      name,
      price,
      category,
      quantity,
      supplier,
      status,
      image: imageUrl, // field in your schema
    });

    await item.save();
    return res.status(201).json({
      _id: item._id,
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      status: item.status,
    });
  } catch (error) {
    next(error);
  }
};

exports.view = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    const item = await Item.findById(id).select(
      "-lastUpdated -createdAt -updatedAt -__v"
    );

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
    const {
      sortBy = "category",
      order = "desc",
      _start = 0,
      _limit = 10,
    } = req.query;

    // Convert _start and _limit to numbers
    const start = parseInt(_start, 10);
    const limit = parseInt(_limit, 10);

    const query = Item.find({})
      .sort({ [sortBy]: order })
      .skip(start)
      .limit(limit)
      .select("name image quantity status");

    const items = await query.exec();

    return res.status(200).json(items);
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
    }).select("_id name image quantity price status");

    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};
