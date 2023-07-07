import * as cinemas from "../controllers/cinemas.js";
import express from "express";

const router = express.Router();

// get All Cinemas
router.get("/", cinemas.findAll);

export { router as cinemaRouter };
