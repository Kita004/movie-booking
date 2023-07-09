export const SeatButton = ({ id, position, status }) => {
    return (
        <button className={"seat-btn " + status} disabled={status !== "free"}>
            {position}
        </button>
    );
};
