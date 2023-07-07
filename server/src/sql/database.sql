DROP TABLE IF EXISTS seats, halls, cinemas;

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
    status ENUM('free', 'reserved', 'sold') DEFAULT 'free',
    hall_id INT,
    FOREIGN KEY (hall_id) REFERENCES halls(id)
);
