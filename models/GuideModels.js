import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Tour from "./TourModels.js";


const Guide = db.define(
  "Guide",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "guide",
  }
);

Guide.hasMany(Tour, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Tour.belongsTo(Guide, {
  foreignKey: "GuideId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//ini bener


export default Guide;
