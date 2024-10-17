import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Tour from "./TourModels.js";
import Booking from "./BookingModels.js";
import Review from "./ReviewModels.js";

const Tourist = db.define(
  "Tourist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tourist",
  }
);

Tourist.hasMany(Review, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Review.belongsTo(Tourist, {
  foreignKey: "TouristId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//ini bener

export default Tourist;
