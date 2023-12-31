import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export const fetchCinemas = async () => {
    try {
        const res = await axios.get(BASE_URL + "/cinemas");
        return res.data;
    } catch (err) {
        console.info("Error when fetching Cinemas: ", err);
    }
};

export const fetchHallsByCinemaId = async (cinema_id) => {
    try {
        const res = await axios.get(BASE_URL + `/halls?cinema_id=${cinema_id}`);
        return res.data;
    } catch (err) {
        console.info("Error when fetching Halls with cinema_id: ", err);
    }
};

export const fetchSeatsByHallId = async (hall_id) => {
    try {
        const res = await axios.get(BASE_URL + `/seats?hall_id=${hall_id}`);
        return res.data;
    } catch (err) {
        console.info("Error when fetching Seats with hall_id: ", err);
    }
};

export const bookSeat = async (seatToReserve) => {
    try {
        const res = await axios.post(
            BASE_URL + "/seats/reserve",
            seatToReserve
        );
        return res.data;
    } catch (err) {
        console.info("Error when Reserving Seat: ", err);
    }
};
