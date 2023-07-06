import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello this is the Backend!");
});

app.get("*", (req, res) => {
    res.send("This is an invalid URL...");
});

app.listen(process.env.PORT || 3001, () => {
    console.info("SERVER STARTED");
});
