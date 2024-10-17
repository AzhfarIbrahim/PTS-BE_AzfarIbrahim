import Review from "../models/ReviewModels.js";
import Tourist from "../models/TouristModels.js"; // Model untuk user/wisatawan
import Tour from "../models/TourModels.js"; // Model untuk paket wisata

// Membuat review baru
export const createReview = async (req, res) => {
  const { comment, tanggal_review, TouristId, TourId } = req.body; // Sesuaikan dengan field yang dibutuhkan
  try {
    // Cek apakah TourId valid
    let tour = await Tour.findByPk(TourId);
    if (!tour) {
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

    // Atur tanggal review, jika tidak diberikan gunakan tanggal saat ini
    const reviewDate = tanggal_review || new Date();

    // Buat review
    const review = await Review.create({
      comment,
      tanggal_review: reviewDate,
      TouristId : TouristId, // Id wisatawan yang memberikan review
      TourId: TourId, // Id paket wisata yang di-review
    });

    // Return response sukses
    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mengambil semua review
export const getReview = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: Tour, as: "Tour", required: true }, // Paket wisata yang di-review
        { model: Tourist, as: "Tourist", required: true }, // Wisatawan yang memberi review
      ],
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mengambil review berdasarkan id
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.query; // Mengambil id dari parameter URL
    const review = await Review.findByPk(id, {
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
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus review berdasarkan id
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedReview = await Review.destroy({ where: { id } });
    if (deletedReview) {
      res.status(204).end(); // No Content response
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
