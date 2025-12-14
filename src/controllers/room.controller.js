const Room = require("../models/room.model");

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({
      success: true,
      data: room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("allocatedGuests.bookingId");
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single room
exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate(
      "allocatedGuests.bookingId"
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        error: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update room
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        error: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete room
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        error: "Room not found",
      });
    }

    await room.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get available rooms for specific dates
exports.getAvailableRooms = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        error: "Please provide checkIn and checkOut dates",
      });
    }

    const rooms = await Room.find();
    const availableRooms = [];

    const newCheckIn = new Date(checkIn);
    const newCheckOut = new Date(checkOut);

    for (const room of rooms) {
      let isAvailable = true;

      for (const guest of room.allocatedGuests) {
        const existingCheckIn = new Date(guest.checkIn);
        const existingCheckOut = new Date(guest.checkOut);

        if (
          (newCheckIn >= existingCheckIn && newCheckIn < existingCheckOut) ||
          (newCheckOut > existingCheckIn && newCheckOut <= existingCheckOut) ||
          (newCheckIn <= existingCheckIn && newCheckOut >= existingCheckOut)
        ) {
          isAvailable = false;
          break;
        }
      }

      if (isAvailable) {
        availableRooms.push(room);
      }
    }

    res.status(200).json({
      success: true,
      count: availableRooms.length,
      data: availableRooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
