const Room = require("../models/room.model");
const Booking = require("../models/booking.model");

exports.createRoom = async (req, res) => {
  try {
    const { roomNo, roomType } = req.body;

    if (!roomNo) {
      return res.status(400).json({ message: "Room number is required" });
    }

    // Prevent duplicate room numbers
    const existingRoom = await Room.findOne({ roomNo });
    if (existingRoom) {
      return res.status(400).json({ message: "Room already exists" });
    }

    const room = await Room.create({
      roomNo,
      roomType,
    });

    res.status(201).json(room);
  } catch (error) {
    console.error("Create room error:", error);
    res.status(500).json({ message: "Failed to create room" });
  }
};

exports.getRoomStatusByDate = async (req, res) => {
  const selectedDate = new Date(req.query.date);

  // 1. Get all rooms
  const rooms = await Room.find({ active: true });

  // 2. Find bookings overlapping selected date
  const bookings = await Booking.find({
    checkIn: { $lte: selectedDate },
    checkOut: { $gt: selectedDate },
    status: { $in: ["ALLOCATED", "CHECKED_IN"] },
    assignedRoom: { $ne: null },
  }).populate("assignedRoom");

  // 3. Build response
  const response = rooms.map((room) => {
    const booking = bookings.find(
      (b) => b.assignedRoom._id.toString() === room._id.toString()
    );

    if (!booking) {
      return {
        roomNo: room.roomNo,
        status: "AVAILABLE",
      };
    }

    if (booking.status === "CHECKED_IN") {
      return {
        roomNo: room.roomNo,
        status: "OCCUPIED",
      };
    }

    return {
      roomNo: room.roomNo,
      status: "ALLOCATED",
    };
  });

  res.json(response);
};
