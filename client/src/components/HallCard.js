import { useNavigate } from "react-router-dom";

export const HallCard = ({ id, name, rows, cols, getSeats }) => {
    const nav = useNavigate();
    const onCheck = () => {
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
