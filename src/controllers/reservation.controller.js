const Reservation = require("../models/Reservation");

exports.createReservation = async (req, res) => {
  const reservation = await Reservation.create(req.body);
  res.status(201).json(reservation);
};

exports.updatePayment = async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    {
      paymentStatus: req.body.paymentStatus,
      paymentDate: req.body.paymentDate || new Date(),
      amount: req.body.amount,
    },
    { new: true }
  );
  res.json(reservation);
};

exports.updateStatus = async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(reservation);
};

exports.updateRoom = async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    { room: req.body.room },
    { new: true }
  );
  res.json(reservation);
};

exports.getByProperty = async (req, res) => {
  const data = await Reservation.find({ propertyName: req.query.propertyName });
  res.json(data);
};

exports.getByPaymentDate = async (req, res) => {
  const data = await Reservation.find({
    propertyName: req.query.propertyName,
    paymentDate: req.query.paymentDate,
  });
  res.json(data);
};

exports.getPendingPayments = async (req, res) => {
  try {
    const { propertyName } = req.query;

    if (!propertyName) {
      return res.status(400).json({
        message: "propertyName is required",
      });
    }

    const reservations = await Reservation.find({
      propertyName,
      paymentStatus: "pending",
      status: { $ne: "cancelled" },
    }).sort({ checkInDate: 1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByCheckInDate = async (req, res) => {
  const data = await Reservation.find({
    propertyName: req.query.propertyName,
    checkInDate: req.query.checkInDate,
  });
  res.json(data);
};

exports.getByCheckOutDate = async (req, res) => {
  const data = await Reservation.find({
    propertyName: req.query.propertyName,
    checkOutDate: req.query.checkOutDate,
  });
  res.json(data);
};

exports.getTodayByRoom = async (req, res) => {
  const today = new Date();
  const data = await Reservation.find({
    propertyName: req.query.propertyName,
    room: req.query.room,
    checkInDate: { $lte: today },
    checkOutDate: { $gte: today },
  });
  res.json(data);
};

exports.getTodayByRoomAndStatus = async (req, res) => {
  const today = new Date();
  const data = await Reservation.find({
    propertyName: req.query.propertyName,
    room: req.query.room,
    status: req.query.status,
    checkInDate: { $lte: today },
    checkOutDate: { $gte: today },
  });
  res.json(data);
};

exports.checkInReservation = async (req, res) => {
  const { room } = req.body;

  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    {
      status: "checked-in",
      room,
      checkInTime: new Date().toLocaleTimeString(),
    },
    { new: true }
  );

  await Room.findOneAndUpdate(
    { room, propertyName: reservation.propertyName },
    { status: "occupied" }
  );

  res.json(reservation);
};
