import "dotenv/config";
import { Sequelize } from "sequelize";

// * set credentials
const user = process.env.RESOURCES_DB_USER || "";
const pwd = process.env.RESOURCES_DB_USER_PWD;
const host = process.env.RESOURCES_DB_HOST;

const _ResourcesDB = new Sequelize("resources", user, pwd, {
  host: host,
  dialect: "mysql",
});

export default _ResourcesDB;
