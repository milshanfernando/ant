const Booking = require("../models/booking.model");
const Room = require("../models/room.model");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all bookings or filter by date
exports.getBookings = async (req, res) => {
  try {
    let query = {};

    if (req.query.date) {
      const searchDate = new Date(req.query.date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);

      query.date = {
        $gte: searchDate,
        $lt: nextDay,
      };
    }

    const bookings = await Booking.find(query).populate("allocatedRoom");
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "allocatedRoom"
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    // If booking has an allocated room, remove guest from room
    if (booking.allocatedRoom) {
      await Room.findByIdAndUpdate(booking.allocatedRoom, {
        $pull: { allocatedGuests: { bookingId: booking._id } },
      });
    }

    await booking.deleteOne();

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

// Assign guest to room
exports.assignGuestToRoom = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    // Get all rooms
    const rooms = await Room.find();
    let availableRoom = null;

    // Check each room for availability
    for (const room of rooms) {
      let isAvailable = true;

      // Check if new booking conflicts with existing guests
      for (const guest of room.allocatedGuests) {
        const existingCheckIn = new Date(guest.checkIn);
        const existingCheckOut = new Date(guest.checkOut);
        const newCheckIn = new Date(booking.checkIn);
        const newCheckOut = new Date(booking.checkOut);

        // Check for date overlap
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
        availableRoom = room;
        break;
      }
    }

    if (!availableRoom) {
      return res.status(400).json({
        success: false,
        error: "No available rooms for the selected dates",
      });
    }

    // Add guest to room
    availableRoom.allocatedGuests.push({
      name: booking.guestName,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      bookingId: booking._id,
    });

    // Update room status
    availableRoom.status = "occupied";
    await availableRoom.save();

    // Update booking
    booking.assignRoom = true;
    booking.allocatedRoom = availableRoom._id;
    await booking.save();

    res.status(200).json({
      success: true,
      data: {
        booking,
        room: availableRoom,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
