CREATE TABLE inventory(
    id SERIAL,
    name VARCHAR(255),
    price NUMERIC(6, 2),
    quantity INTEGER,
    total_ratings INTEGER DEFAULT 0,
    avg_rating NUMERIC(3,2) DEFAULT 0
);