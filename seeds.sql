USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socks", "apparel", 7.00, 8),
("flippy-floppys", "apparel", 17.50, 5),
("LaCroix", "grocery", 4.00, 22),
("Thin Mints", "grocery", 4.50, 10),
("Eagles Ball Cap", "apparel", 23.00, 2),
("Peanut Butter", "grocery", 3.75, 100),
("Toyota Rav4", "auto", 24995.00,1),
("Cardi B Poster", "misc", 10, 20),
("Bamazon Echo", "electronics", 59.99, 10000),
("Vitamin D Capsules 500/ct", "health", 22.95, 7);

USE bamazon;
INSERT INTO departments (department_name, over_head_costs)
VALUES ("apparel", 1280),
("grocery", "1000"),
("auto", "16000"),
("electronics", "4000"),
("health", "10000"),
("misc", "7200");