INSERT INTO cinemas (name) 
    VALUES 
        ("Cinema A"), ("Cinema B");

INSERT INTO halls (name, row_amount, column_amount, cinema_id) 
    VALUES 
        ("Hall AA", 2, 3, 1),
        ("Hall AB", 3, 4, 1),
        ("Hall BA", 4, 5, 2),
        ("Hall BB", 5, 6, 2);


INSERT INTO seats (position, status, hall_id) 
    VALUES 
        (3, "sold", 1),
        (4, "reserved", 1),
        (6, "reserved", 2),
        (8, "sold", 2),
        (2, "sold", 3)
        (3, "sold", 3)
        (4, "sold", 3)
        (12, "sold", 4),
        (13, "sold", 4);