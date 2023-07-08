import { useNavigate } from "react-router-dom";

export const CinemaCard = ({ id, name, getHalls }) => {
    const nav = useNavigate();
    const onCheck = () => {
        getHalls(id);
        nav("/cinema/" + id);
    };

    return (
        <div className="card">
            <h2>{name || "Hey"}</h2>
            <button onClick={onCheck}>Check!</button>
        </div>
    );
};
