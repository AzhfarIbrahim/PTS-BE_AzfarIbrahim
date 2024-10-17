import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Tourist from "./TouristModels.js";
import Tour from "./TourModels.js";

const Booking = db.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    tanggal_pemesanan: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "booking",
  }
);

Tourist.hasMany(Booking, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Booking.belongsTo(Tourist, {
  foreignKey: "TouristId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//inin bener

export default Booking;
