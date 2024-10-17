import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Booking from "./BookingModels.js";
import Review from "./ReviewModels.js";

const Tour = db.define(
  "Tour",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "tour" }
);


Tour.hasMany(Booking, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Booking.belongsTo(Tour, {
  foreignKey: "TourId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Tour.hasMany(Review, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Review.belongsTo(Tour, {
  foreignKey: "TourId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//ini bener


export default Tour;
