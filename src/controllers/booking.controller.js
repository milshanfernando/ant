const Booking = require("../models/booking.model");
const Room = require("../models/room.model");

/**
 * CREATE BOOKING
 * Can be past, today or future
 * Room is optional
 */
exports.createBooking = async (req, res) => {
  try {
    const {
      guestName,
      phoneNumber,
      bookingThrough,
      checkIn,
      checkOut,
      amount,
      referenceNo,
    } = req.body;

    if (!guestName || !checkIn || !checkOut) {
      return res.status(400).json({
        message: "Guest name, check-in and check-out are required",
      });
    }

    const booking = await Booking.create({
      guestName,
      phoneNumber,
      bookingThrough,
      checkIn,
      checkOut,
      amount,
      referenceNo,
      status: "PENDING",
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

/**
 * GET ALL BOOKINGS
 */
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("assignedRoom")
      .sort({ checkIn: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

/**
 * ALLOCATE ROOM TO BOOKING
 */
exports.allocateRoom = async (req, res) => {
  try {
    const { bookingId, roomId } = req.body;

    if (!bookingId || !roomId) {
      return res
        .status(400)
        .json({ message: "Booking ID and Room ID are required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Prevent double booking
    const conflict = await Booking.findOne({
      assignedRoom: roomId,
      status: { $in: ["ALLOCATED", "CHECKED_IN"] },
      checkIn: { $lt: booking.checkOut },
      checkOut: { $gt: booking.checkIn },
    });

    if (conflict) {
      return res.status(400).json({
        message: "Room already allocated for selected dates",
      });
    }

    booking.assignedRoom = roomId;
    booking.status = "ALLOCATED";
    await booking.save();

    res.json({ message: "Room allocated successfully" });
  } catch (error) {
    console.error("Allocate room error:", error);
    res.status(500).json({ message: "Failed to allocate room" });
  }
};

/**
 * CHECK-IN
 */
exports.checkIn = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "CHECKED_IN";
    await booking.save();

    res.json({ message: "Guest checked in" });
  } catch (error) {
    res.status(500).json({ message: "Check-in failed" });
  }
};

/**
 * CHECK-OUT
 */
exports.checkOut = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "CHECKED_OUT";
    await booking.save();

    res.json({ message: "Guest checked out" });
  } catch (error) {
    res.status(500).json({ message: "Check-out failed" });
  }
};
