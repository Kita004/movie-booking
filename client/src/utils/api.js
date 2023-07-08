import axios from "axios";

export const fetchCinemas = async () => {
    try {
        const res = await axios.get("/api/cinemas");
        return res.data;
    } catch (err) {
        console.info("Error when fetching Cinemas: ", err);
    }
};

export const fetchHallsByCinemaId = async (cinema_id) => {
    try {
        const res = await axios.get(`/api/halls?cinema_id=${cinema_id}`);
        return res.data;
    } catch (err) {
        console.info("Error when fetching Halls with cinema_id: ", err);
    }
};

export const fetchSeatsByHallId = async (hall_id) => {
    try {
        const res = await axios.get(`/api/seats?hall_id=${hall_id}`);
        return res.data;
    } catch (err) {
        console.info("Error when fetching Seats with hall_id: ", err);
    }
};
