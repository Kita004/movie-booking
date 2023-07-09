export const SeatButton = ({ id, hall_id, position, status, reserveSeat }) => {
    const onReserve = () => {
        reserveSeat(hall_id, position);
    };

    return (
        <button
            onClick={onReserve}
            className={"seat-btn " + status}
            disabled={status !== "free"}
        >
            {position}
        </button>
    );
};
