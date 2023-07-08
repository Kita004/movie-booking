import { db } from "./sql/db.js";

// constructor
export const Hall = (hall) => {
    this.name = hall.name;
    this.row_amount = hall.row_amount;
    this.column_amount = hall.column_amount;
    this.cinema_id = hall.cinema_id;
};

Hall.getAll = (cinema_id, result) => {
    let query = "SELECT * FROM halls";

    if (cinema_id) {
        query += ` WHERE cinema_id = ${cinema_id}`;
    }

    db.query(query, (err, data) => {
        if (err) {
            console.info("Error when querying all Halls...");
            result(err, null);
            return;
        }

        result(null, data);
    });
};

Hall.getById = (id, result) => {
    let query = `SELECT * FROM halls WHERE id = ${id}`;

    db.query(query, (err, data) => {
        if (err) {
            console.info("Error when finding Hall by ID: ", err);
            result(err, null);
            return;
        }

        if (data.length) {
            result(null, data);
        } else {
            result({ message: "Not Found..." }, null);
        }
    });
};

Hall.getByCinemaId = (cinema_id, result) => {
    let query = `SELECT * FROM halls WHERE cinema_id = ${cinema_id}`;
    db.query(query, (err, data) => {
        if (err) {
            console.info("Error when finding Hall by cinemaID: ", err);
            result(err, null);
            return;
        }

        if (data.length) {
            result(null, data);
        } else {
            result({ message: "Not Found..." }, null);
        }
    });
};
