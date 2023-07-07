DROP TABLE IF EXISTS seats, halls, cinemas;
DROP EVENT IF EXISTS delete_seats_event;

CREATE TABLE IF NOT EXISTS cinemas (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS halls (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    row_amount INT NOT NULL,
    column_amount INT NOT NULL,
    cinema_id INT,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id)
);

CREATE TABLE IF NOT EXISTS seats (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    position INT,
    status ENUM('reserved', 'sold') DEFAULT 'reserved',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    hall_id INT,
    FOREIGN KEY (hall_id) REFERENCES halls(id)
);

SET GLOBAL event_scheduler = ON;

CREATE EVENT IF NOT EXISTS delete_seats_event
    ON SCHEDULE EVERY 1 MINUTE
    ON COMPLETION PRESERVE
    DO
        DELETE FROM seats 
        WHERE TIMESTAMPDIFF(MINUTE, created_at, NOW()) >= 2 AND seats.status = "reserved";