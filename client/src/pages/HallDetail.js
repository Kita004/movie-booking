import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SeatButton } from "../components/SeatButton";
import * as api from "../utils/api";

export const HallDetail = ({ seats }) => {
    const [seatsToBuy, setSeatsToBuy] = useState([]);
    const params = useParams();
    const nav = useNavigate();

    const reserveSeat = async (position) => {
        const seatToReserve = { hall_id: params.id, position: position };
        const res = await api.reserveSeat(seatToReserve);
        setSeatsToBuy((prev) => [...prev, res]);
    };

    return (
        <div id="hall-detail">
            <h1>Seats</h1>
            <div id="seat-container" className="flex-container">
                {seats
                    ? seats.map((seat) => (
                          <SeatButton
                              key={seat.position}
                              id={seat.id}
                              position={seat.position}
                              status={seat.status}
                              reserveSeat={reserveSeat}
                          />
                      ))
                    : "Loading..."}
            </div>
            <h1>Seats to Buy</h1>
            <div className="flex-container">
                {seatsToBuy.length === 0
                    ? "Reserve Seats!"
                    : seatsToBuy.map((seat) => (
                          <span key={seat.id}>{seat.position}</span>
                      ))}
            </div>
            <button onClick={() => nav(-1)}>Back</button>
        </div>
    );
};
