import {createConnection} from "mysql2/promise";

const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

export default async () => {
    try {
        const connection = await createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
        console.log(`Database ${DB_DATABASE} is ready.`);
        await connection.end();
        return true;
    } catch (error) {
        console.error("Error creating database:", error);
        return false;
    }
}