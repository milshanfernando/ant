const express = require("express");
const router = express.Router();

const itemRouter = require("./items.route");

router.use("/items", itemRouter);

module.exports = router;
