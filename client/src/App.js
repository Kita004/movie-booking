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
    fetchCinemas,
    fetchHallsByCinemaId,
    fetchSeatsByHallId,
} from "./utils/api";
import { buildPositions } from "./utils/hallPositions";

function App() {
    const [cinemas, setCinemas] = useState();
    const [halls, setHalls] = useState();
    const [seats, setSeats] = useState();

    useEffect(() => {
        getCinemas();
    }, []);

    const getCinemas = async () => {
        const data = await fetchCinemas();
        setCinemas(data);
    };

    const getHallsByCinemaId = async (cinema_id) => {
        const data = await fetchHallsByCinemaId(cinema_id);
        setHalls(data);
    };

    const getSeatsByHallId = async (hall_id, rows, cols) => {
        const data = await fetchSeatsByHallId(hall_id);
        setSeats(buildPositions(rows, cols, data));
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
                                <CinemaDetail>
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
                            element={<HallDetail seats={seats} />}
                        />
                    </Routes>
                </Router>
            </div>
        </SocketContext.Provider>
    );
}

export default App;
