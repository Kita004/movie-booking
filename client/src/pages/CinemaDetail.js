import { useNavigate } from "react-router-dom";

export const CinemaDetail = ({ children }) => {
    const nav = useNavigate();

    return (
        <div id="cinema-detail">
            <h1>Halls</h1>
            <div className="flex-container">{children}</div>
            <button onClick={() => nav(-1)}>Back</button>
        </div>
    );
};
