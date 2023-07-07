import * as seats from "../controllers/seats.js";
import express from "express";

const router = express.Router();

// get all seats
router.get("/", seats.findAll);

// find by Id
router.get("/:id", seats.findById);

// create new seat with reserved status
router.post("/reserve", seats.reserveSeat);

// update Seat's position to "Sold" by Pk
router.put("/purchase/:id", seats.buySeat);

export { router as seatRouter };
