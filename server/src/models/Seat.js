import { db } from "./sql/db.js";

export const Seat = (seat) => {
    this.position = seat.position;
    this.hall_id = hall.Seat_id;
};

Seat.create = (newSeat, result) => {
    db.query("INSERT INTO seats SET ?", newSeat, (err, data) => {
        if (err) {
            console.info("Error when creating Seat: ", err);
            result(err, null);
            return;
        }

        console.info("Seat Created Successfully!");
        result(null, { id: data.insertId, ...newSeat });
    });
};

Seat.getAll = (result) => {
    db.query("SELECT * FROM seats", (err, data) => {
        if (err) {
            console.info("Error when querying all Seats...");
            result(err, null);
            return;
        }

        result(null, data);
    });
};

Seat.getById = (id, result) => {
    let query = `SELECT * FROM seats WHERE id = ${id}`;

    db.query(query, (err, data) => {
        if (err) {
            console.info("Error when finding Seat by ID: ", err);
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

Seat.checkIfReserved = (seatToReserve, result) => {
    let query = `SELECT * FROM seats WHERE hall_id = ${seatToReserve.hall_id} AND position = ${seatToReserve.position}`;
    db.query(query, (err, data) => {
        if (err) {
            console.info("Error when finding Seat: ", err);
            result(err, null);
            return;
        }

        if (data.length) {
            result(null, true);
            return;
        }

        result(null, false);
    });
};

Seat.updateStatusById = (id, result) => {
    let query = `UPDATE seats SET status = 'sold' WHERE id = ${id}`;

    db.query(query, (err, data) => {
        if (err) {
            console.info("Error when Updating Seat by ID: ", err);
            result(err, null);
            return;
        }

        if (data.affectedRows == 0) {
            result({ message: "Not Found..." }, null);
        } else {
            result(null, data);
        }
    });
};
