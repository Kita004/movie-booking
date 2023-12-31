import { useNavigate } from "react-router-dom";

export const CinemaDetail = ({ emptyReservedSeats, children }) => {
    const nav = useNavigate();

    const onBack = () => {
        emptyReservedSeats();
        nav(-1);
    };

    return (
        <div id="cinema-detail">
            <h1>Halls</h1>
            <div className="flex-container">{children}</div>
            <button onClick={onBack}>Back</button>
        </div>
    );
};
