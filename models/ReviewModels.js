import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Tour from "./TourModels.js";
import Tourist from "./TouristModels.js";

const Review = db.define(
  "Review",

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_review: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "review",
  }
);



export default Review;
