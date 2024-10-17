import db from "../utils/connection.js";
import Tour from "./TourModels.js";
import Tourist from "./TouristModels.js";
import Review from "./ReviewModels.js";
import Booking from "./BookingModels.js";
import Guide from "./GuideModels.js";

await Tour.sync();
await Tourist.sync();
await Review.sync();
await Guide.sync();
await Booking.sync();

await db.sync({ alter: true });
