const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/reservation.controller");

router.post("/", ctrl.createReservation);
router.patch("/:id/payment", ctrl.updatePayment);
router.patch("/:id/status", ctrl.updateStatus);
router.patch("/:id/room", ctrl.updateRoom);
// Check-in reservation & assign room
router.patch("/:id/check-in", ctrl.checkInReservation);

router.get("/property", ctrl.getByProperty);
router.get("/payment-date", ctrl.getByPaymentDate);
router.get("/payments-pending", ctrl.getPendingPayments);
router.get("/checkin-date", ctrl.getByCheckInDate);
router.get("/checkout-date", ctrl.getByCheckOutDate);
router.get("/today-room", ctrl.getTodayByRoom);
router.get("/today-room-status", ctrl.getTodayByRoomAndStatus);

module.exports = router;
