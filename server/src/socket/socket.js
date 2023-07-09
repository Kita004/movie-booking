import { io } from "..";

io.on("connection", (socket) => {
    console.info("New Client Connected!");

    socket.on("sendMessage", () => console.log("message received..."));
});
