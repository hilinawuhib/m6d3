import { DataTypes } from "sequelize";

import sequelize from "../../utils/db/connect.js";

import Sequelize from "sequelize";

import User from "./user-model.js";

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
    texts: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
 
);

User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

export default Review;
