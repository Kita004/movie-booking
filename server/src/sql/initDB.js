import mysql from "mysql";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const DB_NAME = process.env.DB_NAME || "your_db";

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER || "your_username",
    password: process.env.DB_PASSWORD || "your_password",
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

        // creating new DATABASE
        db.query(
            "CREATE DATABASE IF NOT EXISTS ??;",
            DB_NAME,
            (err, results) => {
                if (err) console.info("Erro when creating Database: ", err);
            }
        );

        // use newly created DATABASE
        db.changeUser(
            {
                database: DB_NAME,
            },
            (err) => {
                if (err) console.info("Error when Changing DB: ", err);
            }
        );

        db.query(createTables, (err, results) => {
            if (err) console.info("Error when executing Query: ", err);
        });

        db.query(createRecords, (err, results) => {
            if (err) console.info("Error when executing Query: ", err);
        });

        console.info("Database, Tables and Records Initiated!!");

        // test query
        db.query("Select * from cinemas;", (err, results) => {
            if (err) {
                console.log("Error when querying all cinemas: ", err);
            } else {
                console.log(results);
            }
        });
    }
});
