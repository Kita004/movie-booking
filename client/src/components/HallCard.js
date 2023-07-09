import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";

export const HallCard = ({ id, name, rows, cols, getSeats }) => {
    const nav = useNavigate();
    const socket = useContext(SocketContext);

    const onCheck = () => {
        if (id) {
            socket.emit("joinHall", id);
        }

        getSeats(id, rows, cols);
        nav("/hall/" + id);
    };
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Size: {rows * cols}</p>
            <button onClick={onCheck}>Check!</button>
        </div>
    );
};
