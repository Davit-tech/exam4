import {Sequelize} from "sequelize";
import databaseExists from "./init.mysql.js";
const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;


const CONFIGS = {
    host: DB_HOST,
    dialect: "mysql",
    define: {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true,
    },
    logging: false,
};
const MYSQL = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, CONFIGS);

(async () => {
    const isReady = await databaseExists();
    if (!isReady) {
        console.error("Database setup failed.");
        process.exit(1);
    }


    try {
        await MYSQL.authenticate();
        console.log("Database connection successfully.");
        return MYSQL;
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
})()


export default MYSQL;
