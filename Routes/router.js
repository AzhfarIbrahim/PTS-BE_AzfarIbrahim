import express from "express";
import {
  createTour,
  deleteTour,
  getTour,
  getTourById,
  updateTour,
} from "../controller/TourController.js";
import {
  createGuide,
  deleteGuide,
  getGuide,
  getGuideById,
  updateGuide,
} from "../controller/GuideController.js";
import {
  createTourist,
  deleteTourist,
  getTourist,
  getTouristById,
  updateTourist,
} from "../controller/TouristController.js";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookingById,
  updateBooking,
} from "../controller/BookingController.js";
import {
  createReview,
  deleteReview,
  getReview,
  getReviewById,
} from "../controller/ReviewController.js";

const router = express.Router();

router.get("/tour", getTour);
router.post("/tour/post", createTour);
router.get("/tour/find", getTourById);
router.put("/tour/update", updateTour);
router.delete("/tour/delete", deleteTour);

router.get("/guide", getGuide);
router.post("/guide/post", createGuide);
router.get("/guide/find", getGuideById);
router.put("/guide/update", updateGuide);
router.delete("/guide/delete", deleteGuide);

router.get("/tourist", getTourist);
router.post("/tourist/post", createTourist);
router.get("/tourist/find", getTouristById);
router.put("/tourist/update", updateTourist);
router.delete("/tourist/delete", deleteTourist);

router.get("/booking", getBooking);
router.post("/booking/post", createBooking);
router.get("/booking/find", getBookingById);
router.put("/booking/update", updateBooking);
router.delete("/booking/delete", deleteBooking);

router.get("/review", getReview);
router.post("/review/post", createReview);
router.get("/review/find", getReviewById);
router.delete("/review/delete", deleteReview);

export default router;
