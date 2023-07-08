import { Hall } from "../models/Halls.js";

export const findAll = (req, res) => {
    const cinema_id = req.query.cinema_id;

    Hall.getAll(cinema_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error when retrieving All Halls...",
            });
        } else {
            res.send(data);
        }
    });
};

export const findById = (req, res) => {
    Hall.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.message) {
                res.status(404).send({
                    message: "Could not find Hall with this ID...",
                });
            } else {
                res.status(500).send({
                    message: "Error when retrieving Hall with ID...",
                });
            }
        } else {
            res.send(data);
        }
    });
};

export const findByCinemaId = (req, res) => {
    Hall.getByCinemaId(req.params.cinema_id, (err, data) => {
        if (err) {
            if (err.message) {
                res.status(404).send({
                    message: "Could not find Hall with this Cinema ID...",
                });
            } else {
                res.status(500).send({
                    message: "Error when retrieving Hall with Cinema ID...",
                });
            }
        } else {
            res.send(data);
        }
    });
};
