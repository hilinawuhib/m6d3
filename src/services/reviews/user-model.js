import { DataTypes } from "sequelize";

import sequelize from "../../utils/db/connect.js";

import Sequelize from "sequelize";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
