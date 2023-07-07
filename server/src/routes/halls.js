import express from "express";
import { db } from "../sql/db.js";

const router = express.Router();

// get all Halls
router.get("/", (req, res) => {
    let query = "SELECT * FROM halls";

    db.query(query, (err, data) => {
        if (err) {
            console.info("Error: ", err);
            return res.json(err.message);
        } else {
            return res.json(data);
        }
    });
});

// get Hall by Pk
router.get("/:id", (req, res) => {
    let query = `SELECT * FROM halls WHERE id = ${req.params.id}`;

    db.query(query, (err, data) => {
        if (err) {
            console.info("Error: ", err);
            return res.json(err.message);
        }

        if (data.length) {
            return res.json(data);
        } else {
            return res.json({ message: "Could not find Hall with this ID..." });
        }
    });
});

export { router as hallRouter };
