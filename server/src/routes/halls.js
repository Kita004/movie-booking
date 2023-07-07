import * as halls from "../controllers/halls.js";
import express from "express";

const router = express.Router();

// get all Halls
router.get("/", halls.findAll);

// get Hall by Pk
router.get("/:id", halls.findById);

export { router as hallRouter };
