import express from "express";
import { db } from "../sql/db.js";

const router = express.Router();

// get all seats
router.get("/", (req, res) => {
    let query = "SELECT * FROM seats";

    db.query(query, (err, data) => {
        if (err) {
            console.info("Error when Selecting All Seats: ", err);
            return res.json({ message: err.message });
        }
        return res.json(data);
    });
});

// create new seat with reserved status
router.post("/", (req, res) => {
    const seatToReserve = req.body;
    let seatToCheck;

    // check if seat is already taken
    db.query(
        `SELECT * FROM seats WHERE hall_id = ${seatToReserve.hall_id} AND position = ${seatToReserve.position}`,
        (err, data) => {
            if (err) {
                console.info("Error when Finding seatToCheck: ", err);
                return;
            } else {
                seatToCheck = data;
            }
        }
    );

    if (seatToCheck.length) {
        return res.json({ message: "Seat is already taken..." });
    }

    // if seat is not taken, create one
    db.query(
        `INSERT INTO seats SET position=${seatToReserve.position}, hall_id=${seatToReserve.hall_id}`,
        (err, data) => {
            if (err) {
                console.info("Error when Reserving Seat...");
                return res.json({ message: err.message });
            }
            return res.json({ message: "Seat Reserved Successfully!" }, data);
        }
    );
});

// update Seat's position to "Sold" by Pk
router.put("/:id", (req, res) => {
    let query = `UPDATE seats SET status='sold' WHERE id = ${req.params.id}`;
    db.query(query, (err, data) => {
        if (err) {
            console.info("Error when Buying Seat...");
        } else {
            console.info("Seat bought Successfully!");
        }
    });
});

export { router as seatRouter };
