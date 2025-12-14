const Room = require("../models/room.model");
const Booking = require("../models/booking.model");

const Room = require("../models/room.model");

// 1. Create a single room
exports.createRoom = async (req, res) => {
  try {
    const { RoomNo } = req.body;

    if (!RoomNo) {
      return res.status(400).json({ message: "RoomNo is required" });
    }

    const existingRoom = await Room.findOne({ RoomNo });
    if (existingRoom) {
      return res.status(400).json({ message: "Room already exists" });
    }

    const newRoom = new Room({ RoomNo, allocationList: [] });
    await newRoom.save();

    res.status(201).json({ message: "Room created", room: newRoom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Create multiple rooms (bulk)
exports.createRoomsBulk = async (req, res) => {
  try {
    const { rooms } = req.body; // expect: [{ RoomNo: '101' }, { RoomNo: '102' }, ...]

    if (!Array.isArray(rooms) || rooms.length === 0) {
      return res.status(400).json({ message: "Rooms array is required" });
    }

    const roomsToInsert = [];

    for (const room of rooms) {
      if (!room.RoomNo) continue;
      const exists = await Room.findOne({ RoomNo: room.RoomNo });
      if (!exists) {
        roomsToInsert.push({ RoomNo: room.RoomNo, allocationList: [] });
      }
    }

    if (roomsToInsert.length === 0) {
      return res.status(400).json({ message: "No new rooms to insert" });
    }

    const createdRooms = await Room.insertMany(roomsToInsert);
    res
      .status(201)
      .json({ message: "Rooms created in bulk", rooms: createdRooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json({ rooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 4. Get available rooms for a given date range
exports.getAvailableRooms = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;
    if (!checkIn || !checkOut) {
      return res
        .status(400)
        .json({ message: "checkIn and checkOut dates are required" });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const rooms = await Room.find({ active: true });

    const availableRooms = rooms.filter((room) =>
      room.allocationList.every(
        (item) => item.checkOut <= checkInDate || item.checkIn >= checkOutDate
      )
    );

    res.status(200).json({ rooms: availableRooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
