import { DataTypes } from "sequelize";

import sequelize from "../../utils/db/connect.js";

import Sequelize from "sequelize";

import Product from "../products/model.js";

const Review = sequelize.define(
  "reviews",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { underscored: true }
);

Product.hasMany(Review, {
  onDelete: "CASCADE",
});

Review.belongsTo(Product);

export default Review;
