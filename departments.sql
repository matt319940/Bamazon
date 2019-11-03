USE bamazon;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments(
    department_id int NOT NULL AUTO_INCREMENT,
    department_name varchar(50),
    over_head_costs int NOT NULL,
    PRIMARY KEY (department_id)
);

-- DATA FOR DEPARTMENTS TABLE
INSERT INTO departments(
    department_name,
    over_head_costs
)
VALUES (
    'Entertainment',
    5000
),
(
    'Food',
    500
),
(
    'Jewelry',
    5
),
(
    'Electronics',
    2500
),
(
    'Pets',
    50
);

