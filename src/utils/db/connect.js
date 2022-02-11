import Sequelize from "sequelize";

const { DATABASE_URL } = process.env;
const sequelize = new Sequelize( DATABASE_URL, {
  dialect: "postgres",
  port: process.env.PORT,

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
    await sequelize.sync({ force: true, logging: false });
    console.log("connection had been established");
  } catch (error) {
    console.log(error);
    console.log("unable to connect to database");
  }
};
export default sequelize;
