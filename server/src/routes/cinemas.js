import * as cinemas from "../controllers/cinemas.js";
import express from "express";

const router = express.Router();

// get All Cinemas
router.get("/", cinemas.findAll);

// create Cinema
router.post("/", cinemas.create);

// delete Cinema by ID
router.delete("/", cinemas.deleteOne);

export { router as cinemaRouter };
