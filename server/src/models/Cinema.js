import { db } from "./sql/db.js";

// constructor
export const Cinema = (cinema) => {
    this.name = cinema.name;
};

Cinema.create = (newCinema, result) => {
    db.query("INSERT INTO cinemas SET ?", newCinema, (err, data) => {
        if (err) {
            console.info("Error when creating Cinema: ", err);
            result(err, null);
            return;
        }

        console.info("Cinema Created Successfully!");
        result(null, { id: data.insertId, ...newCinema });
    });
};

Cinema.getAll = (result) => {
    db.query("SELECT * FROM cinemas", (err, data) => {
        if (err) {
            console.info("Error when querying all Cinemas...");
            result(err, null);
            return;
        }

        result(null, data);
    });
};

Cinema.deleteById = (id) => {
    db.query(`DELETE FROM cinemas WHERE id =${id}`, (err, data) => {
        if (err) {
            console.info("Error when deleting Cinema by ID: ", err);
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
