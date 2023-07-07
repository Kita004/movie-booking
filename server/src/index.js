import express from "express";
import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const app = express();
// const db = mysql.createConnection({
//     host: "localhost",
//     user: process.env.DB_USER || "your_username",
//     password: process.env.DB_PASSWORD || "your_password",
// });

// db.connect((err) => {
//     if (err) {
//         console.info("Error when connecting to mysql DB: ", err);
//     } else {
//         console.info("Connected to mysql DB!");
//     }
// });

app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello this is the Backend!");
});

app.get("*", (req, res) => {
    res.send("This is an invalid URL...");
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.info(`SERVER STARTED on PORT: ${PORT}`);
});
