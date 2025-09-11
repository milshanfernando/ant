const Joi = require("joi");
const categoryEnum = [
  "Electronics",
  "Groceries",
  "Clothing",
  "Stationery",
  "Other",
];
const statusEnum = ["in-stock", "out-of-stock", "low-stock"];

module.exports = {
  create: {
    body: Joi.object({
      _id: Joi.forbidden(),
      name: Joi.string().trim().required(),
      image: Joi.string().uri().optional(),
      quantity: Joi.number().integer().min(0).default(0).required(),
      price: Joi.number().min(0).required(),
      category: Joi.string()
        .valid(...categoryEnum)
        .optional(),
      supplier: Joi.string().trim().optional(),
      status: Joi.string()
        .valid(...statusEnum)
        .optional(),
    }),
  },
};
