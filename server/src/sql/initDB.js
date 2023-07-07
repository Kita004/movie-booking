import mysql from "mysql";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER || "your_username",
    password: process.env.DB_PASSWORD || "your_password",
    database: process.env.DB_NAME || "your_db",
    multipleStatements: true,
});

const databaseFilePath = "src/sql/database.sql";
const createTables = fs.readFileSync(databaseFilePath, "utf8");

const sampleDataFilePath = "src/sql/sampleData.sql";
const createRecords = fs.readFileSync(sampleDataFilePath, "utf8");

db.connect((err) => {
    if (err) {
        console.info("Error when connecting to mysql DB: ", err);
    } else {
        console.info("Connected to mysql DB!");

        db.query(createTables, (err, results) => {
            if (err) console.info("Error when creating Tables: ", err);
        });

        db.query(createRecords, (err, results) => {
            if (err) console.info("Error when creating Records: ", err);
        });

        console.info("Tables and Records created successfully!");
    }
});
