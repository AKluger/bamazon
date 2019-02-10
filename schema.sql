DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price Decimal (10,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;


USE bamazon;
CREATE TABLE departments  (
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs Decimal (10,2),
    PRIMARY KEY (department_id)
);

SELECT * FROM departments;