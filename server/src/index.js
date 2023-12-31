import express from "express";
import dotenv from "dotenv";
import * as http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { hallRouter } from "./routes/halls.js";
import { cinemaRouter } from "./routes/cinemas.js";
import { seatRouter } from "./routes/seats.js";

import { initDB } from "./models/sql/initDB.js";
import { createWithSocket, findAllWithSocket } from "./controllers/cinemas.js";
import { reserveSeatWithSocket } from "./controllers/seats.js";

dotenv.config();

// create tables and records
initDB();

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log(`New User Connected: ${socket.id}`);

    socket.on("joinHall", (hall_id) => {
        console.log(`hall_id: ${hall_id} | socket: ${socket.id}`);
        socket.join("hall" + hall_id);
        console.log("Rooms: ", socket.rooms);
    });

    socket.on("fetchCinemas", () => findAllWithSocket(socket));
    socket.on("createCinema", (data) => createWithSocket(socket, data, io));

    socket.on("reserveSeat", (data) => reserveSeatWithSocket(socket, data, io));
});

app.use(express.json());
app.use(cors());

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
server.listen(PORT, () => {
    console.info(`SERVER STARTED on PORT: ${PORT}`);
});
