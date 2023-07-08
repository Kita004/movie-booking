import * as halls from "../controllers/halls.js";
import express from "express";

const router = express.Router();

// get all Halls
router.get("", halls.findAll);

// get Hall by Pk
router.get("/:id", halls.findById);

// get Halls by cinema_id
router.get("/cinema/:cinema_id", halls.findByCinemaId);

export { router as hallRouter };
