import Sequelize from "sequelize";

const {DB_LINK} = process.env;
const sequelize = new Sequelize(process.env.DB_LINK, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require:true,
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
