import Booking from "../models/BookingModels.js";
import Tourist from "../models/TouristModels.js";
import Tour from "../models/TourModels.js"; 

// Membuat booking baru
export const createBooking = async (req, res) => {
  const { tanggal_pemesanan, TourId, TouristId } = req.body; // Sesuaikan dengan field yang dibutuhkan
  try {
    // Cek apakah TourId valid
    let tours = await Tour.findByPk(TourId);
    if (!tours) {
      return res
        .status(400)
        .json({ message: "Tour not found! Check your TourId" });
    }

    // Cek apakah TouristId valid
    let tourist = await Tourist.findByPk(TouristId);
    if (!tourist) {
      return res
        .status(400)
        .json({ message: "Tourist not found! Check your TouristId" });
    }

    // Atur tanggal pemesanan, jika tidak diberikan gunakan tanggal saat ini
    const bookingDate = tanggal_pemesanan || new Date();

    // Buat booking
    const booking = await Booking.create({
      tanggal_pemesanan: bookingDate,
      TourId, // Id paket wisata yang dipesan
      TouristId, // Id wisatawan yang memesan
    });

    // Return response sukses
    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mengambil semua booking
export const getBooking = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Tour,
          // as: "TourId",
          required: true, // Paket wisata yang dipesan
        },
        {
          model: Tourist,
          // as: "TouristId",
          required: true, // Wisatawan yang melakukan pemesanan
        },
      ],
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mengambil booking berdasarkan id
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.query; // Mengambil id dari parameter URL
    const booking = await Booking.findByPk(id, {
      include: [
        {
          model: Tour,
          as: "Tour",
        },
        {
          model: Tourist,
          as: "Tourist",
        },
      ],
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Memperbarui booking
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.query; // Mengambil id dari parameter URL
    const { tanggal_pemesanan, TourId, TouristId } = req.body;

    // Update booking
    const [updated] = await Booking.update(
      { tanggal_pemesanan, TourId: TourId, TouristId: TouristId },
      { where: { id } }
    );
    if (updated) {
      const updatedBooking = await Booking.findByPk(id);
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.query; // Mengambil id dari parameter URL
    const deletedBooking = await Booking.destroy({ where: { id } });
    if (deletedBooking) {
      res.status(204).end(); // No Content response
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
