import { useNavigate, useParams } from "react-router-dom";
import { SeatButton } from "../components/SeatButton";

export const HallDetail = ({
    seats,
    seatsToBuy,
    reserveSeat,
    emptyReservedSeats,
}) => {
    const params = useParams();
    const nav = useNavigate();

    const onBack = () => {
        emptyReservedSeats();
        nav(-1);
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
                              hall_id={params.id}
                              position={seat.position}
                              status={seat.status}
                              reserveSeat={reserveSeat}
                          />
                      ))
                    : "Loading..."}
            </div>
            <h1>Seats to Buy</h1>
            <div className="flex-container">
                {seatsToBuy?.length === 0
                    ? "Reserve Seats!"
                    : seatsToBuy.map((seat) => (
                          <span key={seat.id}>{seat.position}</span>
                      ))}
            </div>
            <button onClick={onBack}>Back</button>
        </div>
    );
};
