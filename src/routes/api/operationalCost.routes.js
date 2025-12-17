// routes/operationalCost.routes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/operationalCost.controller");

router.post("/", ctrl.createCost);
router.get("/", ctrl.getCosts);
router.get("/summary", ctrl.getCostSummary);

module.exports = router;
