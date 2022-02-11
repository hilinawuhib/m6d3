import { DataTypes } from "sequelize";

import sequelize from "../../utils/db/connect.js";

import Sequelize from "sequelize";

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

Cart.belongsToMany(User, { through: "user_cart" });
User.belongsToMany(Cart, { through: "user_cart" });

export default Cart;
