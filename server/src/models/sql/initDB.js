import { db } from "./db.js";
import fs from "fs";

const databaseFilePath = "src/models/sql/database.sql";
const createTables = fs.readFileSync(databaseFilePath, "utf8");

const sampleDataFilePath = "src/models/sql/sampleData.sql";
const createRecords = fs.readFileSync(sampleDataFilePath, "utf8");

export const initDB = () => {
    db.query(createTables, (err, results) => {
        if (err) console.info("Error when creating Tables: ", err);
    });

    db.query(createRecords, (err, results) => {
        if (err) console.info("Error when creating Records: ", err);
    });
};
