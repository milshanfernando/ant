const express = require("express");
const multer = require("multer");
const router = express.Router();

const itemValidation = require("../../validations/item.validation");
const { validate } = require("express-validation");

const itemController = require("../../controllers/item.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/create",
  validate(itemValidation.create),
  upload.single("image"),
  itemController.create
);
router.get("/list", itemController.list);
router.get("/search", itemController.search);
router.get("/:id", itemController.view);

module.exports = router;
