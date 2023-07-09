import express from "express";
import dotenv from "dotenv";

import { hallRouter } from "./routes/halls.js";
import { cinemaRouter } from "./routes/cinemas.js";
import { seatRouter } from "./routes/seats.js";

import { initDB } from "./models/sql/initDB.js";

dotenv.config();

// create tables and records
initDB();

const app = express();
app.use(express.json());
app.use("/api/halls", hallRouter);
app.use("/api/cinemas", cinemaRouter);
app.use("/api/seats", seatRouter);

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
