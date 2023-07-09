export const SeatButton = ({ id, position, status, reserveSeat }) => {
    const onReserve = () => {
        reserveSeat(position);
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
