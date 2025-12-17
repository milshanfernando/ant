const Room = require("../models/Room");

exports.createRoom = async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json(room);
};

exports.updateRoom = async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(room);
};

exports.updateRoomStatus = async (req, res) => {
  const room = await Room.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(room);
};

exports.getRoomsByProperty = async (req, res) => {
  const rooms = await Room.find({ propertyName: req.query.propertyName });
  res.json(rooms);
};

// room.controller.js
exports.getAvailableRooms = async (req, res) => {
  const { propertyName } = req.query;

  const rooms = await Room.find({
    propertyName,
    status: "available",
  }).sort({ room: 1 });

  res.json(rooms);
};
