import { useNavigate, useParams } from "react-router-dom";
import { SeatButton } from "../components/SeatButton";

export const HallDetail = ({ seats }) => {
    const hall_id = useParams();
    const nav = useNavigate();
    return (
        <div id="hall-detail">
            <h1>Seats</h1>
            <div id="seat-container" className="flex-container">
                {seats
                    ? seats.map((seat) => (
                          <SeatButton
                              key={seat.position}
                              id={seat.id || null}
                              position={seat.position}
                              status={seat.status}
                          />
                      ))
                    : "Loading..."}
            </div>
            <button onClick={() => nav(-1)}>Back</button>
        </div>
    );
};
