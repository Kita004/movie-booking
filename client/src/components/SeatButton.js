export const SeatButton = ({ id, position, status }) => {
    return <button className={"seat-btn " + status}>{position}</button>;
};
