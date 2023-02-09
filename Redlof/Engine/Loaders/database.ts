import { Sequelize } from "sequelize";
const dotenv = require('dotenv').config()

export const sequelize = new Sequelize(
    `${process.env.DB_NAME}`,
    `${process.env.DB_USERNAME}`,
    `${process.env.DB_PASSWORD}`,
    {
        dialect: "postgres",
        host:"localhost",
        port:5432
    },
    );
    console.log(process.env.DB_NAME)

export const databaseLoader = async () => {
    await sequelize.authenticate();
    // Create table if does not exist
    await sequelize.sync();
    console.log("DB Connection has been established successfully.");
    // await sequelize.sync({ force: true });
}
// const sequelize = new Sequelize("app", "postgres", "root", {
//   host: "localhost",
//   dialect: "postgres",
//   port: 5432,
// });

