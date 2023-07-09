import { io } from "..";

// does not work...
io.on("connection", (socket) => {
    console.info("New Client Connected!");
});

export const sendMessage = (data) => {
    io.on("sendMessage", () => {
        console.info("Meassage receved...", data);
    });
};
