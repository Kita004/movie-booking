import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainPage } from "./pages/MainPage";
import { CinemaDetail } from "./pages/CinemaDetail";
import { HallDetail } from "./pages/HallDetail";
import { CinemaCard } from "./components/CinemaCard";
import { HallCard } from "./components/HallCard";

import { socket, SocketContext } from "./context/socket";

import {
    // fetchCinemas,
    fetchHallsByCinemaId,
    fetchSeatsByHallId,
    bookSeat,
} from "./utils/api";
import { buildPositions } from "./utils/hallPositions";

function App() {
    const [cinemas, setCinemas] = useState();
    const [halls, setHalls] = useState();
    const [seats, setSeats] = useState();
    const [seatsToBuy, setSeatsToBuy] = useState([]);

    useEffect(() => {
        socket.on("createCinema", (data) => {
            console.log("Data: ", data);
            setCinemas((prev) => [...prev, data]);
        });
    }, [socket]);

    useEffect(() => {
        getCinemas();
    }, []);

    const getCinemas = async () => {
        socket.emit("fetchCinemas");
        socket.on("fetchCinemas", (data) => {
            setCinemas(data);
        });
    };

    const getHallsByCinemaId = async (cinema_id) => {
        const data = await fetchHallsByCinemaId(cinema_id);
        setHalls(data);
    };

    const getSeatsByHallId = async (hall_id, rows, cols) => {
        const data = await fetchSeatsByHallId(hall_id);
        setSeats(buildPositions(rows, cols, data));
    };

    const reserveSeat = async (hall_id, position) => {
        const seatToReserve = { hall_id: hall_id, position: position };
        const res = await bookSeat(seatToReserve);
        setSeatsToBuy((prev) => [...prev, res]);
    };
    const emptyReservedSeats = () => {
        setSeatsToBuy([]);
    };

    return (
        <SocketContext.Provider value={socket}>
            <div className="App flex-container">
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <MainPage>
                                    {cinemas
                                        ? cinemas.map((cinema) => (
                                              <CinemaCard
                                                  key={cinema.id}
                                                  id={cinema.id}
                                                  name={cinema.name}
                                                  getHalls={getHallsByCinemaId}
                                              />
                                          ))
                                        : "Loading..."}
                                </MainPage>
                            }
                        />
                        <Route
                            path="cinema/:id"
                            element={
                                <CinemaDetail
                                    emptyReservedSeats={emptyReservedSeats}
                                >
                                    {halls
                                        ? halls.map((hall) => (
                                              <HallCard
                                                  key={hall.id}
                                                  id={hall.id}
                                                  name={hall.name}
                                                  rows={hall.row_amount}
                                                  cols={hall.column_amount}
                                                  getSeats={getSeatsByHallId}
                                              />
                                          ))
                                        : "Loading..."}
                                </CinemaDetail>
                            }
                        />
                        <Route
                            path="/hall/:id"
                            element={
                                <HallDetail
                                    seats={seats}
                                    seatsToBuy={seatsToBuy}
                                    reserveSeat={reserveSeat}
                                    emptyReservedSeats={emptyReservedSeats}
                                />
                            }
                        />
                    </Routes>
                </Router>
            </div>
        </SocketContext.Provider>
    );
}

export default App;
