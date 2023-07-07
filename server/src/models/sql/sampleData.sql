INSERT INTO cinemas (name) 
    VALUES 
        ("Cinema A"), ("Cinema B");

INSERT INTO halls (name, row_amount, column_amount, cinema_id) 
    VALUES 
        ("Hall A", 2, 3, 1),
        ("Hall B", 3, 4, 2);


INSERT INTO seats (position, status, hall_id) 
    VALUES 
        (3, "sold", 1),
        (4, "reserved", 1),
        (6, "reserved", 2),
        (8, "sold", 2),
        (9, "sold", 2);