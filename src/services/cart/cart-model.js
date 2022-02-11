import { DataTypes } from "sequelize";

import sequelize from "../../utils/db/connect.js";

import Sequelize from "sequelize";
import Product from "../products/model.js"

import User from "../reviews/user-model.js";

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  { underscored: true }
);
Product.hasMany(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(Product, { onDelete: "CASCADE" });

User.hasMany(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(User, { onDelete: "CASCADE" });
export default Cart;
