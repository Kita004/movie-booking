import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER || "your_username",
    password: process.env.DB_PASSWORD || "your_password",
    database: process.env.DB_NAME || "your_db",
    multipleStatements: true,
});

db.connect((err) => {
    if (err) {
        console.info("Error when connecting to mysql DB: ", err);
    } else {
        console.info("Connected to mysql DB!");
    }
});
