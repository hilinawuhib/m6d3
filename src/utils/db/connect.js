import Sequelize from "sequelize";
const { POSTGRES_URI } = process.env;
const sequelize = new Sequelize(POSTGRES_URI, {
  dialectOptions: {         
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    await sequelize.sync({ alter: true, logging: false });
    console.log("connection had been established");
  } catch (error) {
    console.log(error);
    console.log("unable to connect to database");
  }
};
export default sequelize;
