const express = require("express");
const router = express.Router();

const itemValidation = require("../../validations/item.validation");
const { validate } = require("express-validation");

const itemController = require("../../controllers/item.controller");

router.post("/create", validate(itemValidation.create), itemController.create);
router.get("/list", itemController.list);
router.get("/search", itemController.search);
router.get("/:id", itemController.view);

module.exports = router;
