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

export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!!",
        });
    }

    const cinema = new Cinema({
        name: req.body.name,
    });

    Cinema.create(cinema, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error when Creating New Cinema...",
            });
        } else {
            res.send(data);
        }
    });
};
