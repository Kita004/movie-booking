import { Cinema } from "../models/Cinema.js";

export const findAll = (req, res) => {
    Cinema.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error when retrieving All Cinemas...",
            });
        } else {
            res.send(data);
        }
    });
};

export const findAllWithSocket = (socket) => {
    Cinema.getAll((err, data) => {
        if (err) {
            socket.emit("sendError", { errMsg: err });
        } else {
            socket.emit("fetchCinemas", data);
        }
    });
};

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!!",
        });
    }

    const newCinema = {
        name: req.body.name,
    };

    Cinema.create(newCinema, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error when Creating New Cinema...",
            });
        } else {
            res.send(data);
        }
    });
};

export const createWithSocket = (socket, data, io = null) => {
    if (!data) {
        socket.emit("sendError", { message: "Content cannot be empty!" });
    }

    const newCinema = {
        name: data.cinema_name,
    };

    Cinema.create(newCinema, (err, data) => {
        if (err) {
            socket.emit("sendError", {
                message: err.message || "Error when Creating New Cinema...",
            });
        } else {
            io.emit("createCinema", data);
        }
    });
};

export const deleteOne = (req, res) => {
    Cinema.deleteById(req.params.id, (err, data) => {
        if (err) {
            if (err.message) {
                res.status(404).send({
                    message: "Could not Find Cinema with this ID...",
                });
            } else {
                res.status(500).send({
                    message: "Could note Delete Cinema with this ID...",
                });
            }
        } else {
            res.send({ message: "Cinema Deleted Successfully!" });
        }
    });
};
