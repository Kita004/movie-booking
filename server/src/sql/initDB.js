import { db } from "./db.js";
import fs from "fs";

const databaseFilePath = "src/sql/database.sql";
const createTables = fs.readFileSync(databaseFilePath, "utf8");

const sampleDataFilePath = "src/sql/sampleData.sql";
const createRecords = fs.readFileSync(sampleDataFilePath, "utf8");

db.query(createTables, (err, results) => {
    if (err) console.info("Error when creating Tables: ", err);
});

db.query(createRecords, (err, results) => {
    if (err) console.info("Error when creating Records: ", err);
});
