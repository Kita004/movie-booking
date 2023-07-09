import { Seat } from "../models/Seat.js";

export const findAll = (req, res) => {
    const hall_id = req.query.hall_id;

    Seat.getAll(hall_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error when retrieving All Seats...",
            });
        } else {
            res.send(data);
        }
    });
};

export const findById = (req, res) => {
    Seat.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.message) {
                res.status(404).send({
                    message: "Could not find Seat with this ID...",
                });
            } else {
                res.status(500).send({
                    message: "Error when retrieving Seat with ID...",
                });
            }
        } else {
            res.send(data);
        }
    });
};

export const reserveSeat = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!!",
        });
    }

    const seatToReserve = {
        position: req.body.position,
        hall_id: req.body.hall_id,
    };

    // check if Seat is already Reserved
    Seat.checkIfReserved(seatToReserve, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error when Checking Reservation...",
            });
        }

        if (data) {
            res.send({ message: "Seat is Already Taken!" });
        }
    });

    // create Seat if position is not Reserved
    Seat.create(seatToReserve, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error when Creating New Seat...",
            });
        } else {
            res.send(data);
        }
    });
};

export const reserveSeatWithSocket = (socket, data, io = null) => {
    if (!data) {
        socket.emit("sendError", { message: "Content cannot be empty!" });
    }
    const seatToReserve = {
        position: data.position,
        hall_id: data.hall_id,
    };

    // check if Seat is already Reserved
    Seat.checkIfReserved(seatToReserve, (err, data) => {
        if (err) {
            socket.emit("sendError", {
                message: "Error when Reserving Seat...",
            });
        }

        if (data) {
            socket.emit({ message: "Seat is Already Taken!" });
        }
    });

    // create Seat if position is not Reserved
    Seat.create(seatToReserve, (err, data) => {
        if (err) {
            socket.emit("sendError", {
                message: "Error when Reserving Seat...",
            });
        } else {
            io.to("hall" + seatToReserve.hall_id).emit(
                "reserveSeat",
                seatToReserve.hall_id
            );
        }
    });
};

export const buySeat = (req, res) => {
    // check if Seat is still Reserved
    Seat.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.message) {
                res.status(404).send({
                    message: "Could not find Seat with this ID...",
                });
            } else {
                res.status(500).send({
                    message: "Error when retrieving Seat with ID...",
                });
            }
        } else {
            Seat.updateStatusById(req.params.id, "sold", (err, data) => {
                if (err) {
                    if (err.message) {
                        res.status(404).send({
                            message: "Could not find Seat with this ID...",
                        });
                    } else {
                        res.status(500).send({
                            message: "Error when retrieving Seat with ID...",
                        });
                    }
                } else {
                    res.send(data);
                }
            });
        }
    });
};
