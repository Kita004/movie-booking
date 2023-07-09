import { useContext, useState } from "react";
import { SocketContext } from "../context/socket";

export const MainPage = ({ children }) => {
    const [input, setInput] = useState();
    const socket = useContext(SocketContext);

    const createCinema = () => {
        socket.emit("createCinema", { cinema_name: input });
    };

    return (
        <div id="main-page">
            <h1>Cinemas</h1>
            <div className="flex-container">{children}</div>
            <div>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Name..."
                />
                <br />
                <button onClick={createCinema}>Send</button>
            </div>
        </div>
    );
};
