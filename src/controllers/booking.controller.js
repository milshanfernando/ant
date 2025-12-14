const Booking = require("../models/booking.model");
const Room = require("../models/room.model");

// Helper: check if two periods overlap
const isOverlapping = (start1, end1, start2, end2) => {
  return !(end1 <= start2 || start1 >= end2);
};

// 1. Create a booking
exports.createBooking = async (req, res) => {
  try {
    const {
      guestName,
      bookingThrough,
      checkIn,
      checkOut,
      status,
      date,
      amount,
      refTmg,
      phoneNumber,
    } = req.body;

    const newBooking = new Booking({
      guestName,
      bookingThrough,
      checkIn,
      checkOut,
      status,
      date,
      amount,
      refTmg,
      phoneNumber,
      assignRoom: null,
      allocatedRoom: false,
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Allocate room for a booking
exports.allocateRoom = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.allocatedRoom) {
      return res.status(400).json({ message: "Room already allocated" });
    }

    const rooms = await Room.find({ active: true });
    let allocated = false;

    for (let room of rooms) {
      const isAvailable = room.allocationList.every(
        (item) =>
          !isOverlapping(
            new Date(booking.checkIn),
            new Date(booking.checkOut),
            new Date(item.checkIn),
            new Date(item.checkOut)
          )
      );

      if (isAvailable) {
        room.allocationList.push({
          guestName: booking.guestName,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
        });

        await room.save();

        booking.assignRoom = room.RoomNo;
        booking.allocatedRoom = true;
        await booking.save();

        allocated = true;
        break;
      }
    }

    if (!allocated) {
      return res
        .status(400)
        .json({ message: "No rooms available for this period." });
    }

    res.status(200).json({ message: "Room allocated successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
