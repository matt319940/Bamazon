DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id int NOT NULL AUTO_INCREMENT,
    product_name varchar(50),
    department_name varchar(50),
    price float NOT NULL,
    stock_quantity int NOT NULL,
    product_sales int NOT NULL,
    PRIMARY KEY (item_id)
);

-- MOCK DATA FOR PRODUCTS TABLE
INSERT INTO products(
    product_name, 
    department_name, 
    price, 
    stock_quantity,
    product_sales
)
VALUES (
    'Ramen Noodles',
    'Food',
    0.75,
    100,
    0
),
(
    'God of War',
    'Entertainment',
    60,
    30,
    0
),
(
    'Rolex',
    'Jewelry',
    6000,
    5,
    0
),
(
    'Gold Fish',
    'Pets',
    0.50,
    35,
    0
),
(
    'Google Pixel 4',
    'Electronics',
    900,
    25,
    0
),
(
    'Settlers of Catan',
    'Entertainment',
    50,
    15,
    0
),
(
    'Pecan Spinwheels',
    'Food',
    3,
    75,
    0
),
(
    'Snickers',
    'Food',
    1.00,
    80,
    0
),
(
    'Harry Potter and the Prisoner of Azkaban',
    'Entertainment',
    25,
    20,
    0
),
(
    'Dog Bone',
    'Pets',
    5,
    30,
    0
);

