import { DataTypes } from "sequelize";

import sequelize from "../../utils/db/connect.js";

import Sequelize from "sequelize";

const Product = sequelize.define(
  "products",
  {
   products_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
     allowNull: false,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
      validate: {
        isURL: true,
      },
    },
  },
  { underscored: true }
);

export default Product;
