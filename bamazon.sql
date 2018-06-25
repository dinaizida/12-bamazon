DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(50) NOT NULL,
  department VARCHAR(50) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product, department, price, quantity)
VALUES ("Baby Formula", "Baby", 15.00, 300),
       ("Pacifier", "Baby", 5.00, 300),
       ("Baby Wipes", "Baby", 2.00, 300),
       ("Cat Food", "Pet", 20.00, 100),
       ("Dog Food", "Pet", 25.00, 100),
       ("Milk", "Food", 5.00, 400),
       ("Cheese", "Food", 5.00, 400),
       ("Chicken", "Food", 5.00, 4),
       ("Bed", "Furniture", 150.00, 4),
       ("Table", "Furniture", 100.00, 4);

SELECT * FROM products;

CREATE TABLE departments(
	department_id INTEGER AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs DECIMAL (10,2) NOT NULL,
	total_profit DECIMAL (10,2) DEFAULT 0,
	PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, over_head_costs, total_profit)
VALUES ("Baby", 10,0),
("Pet", 20,0),
("Food", 3,0),
("Furniture", 90,0);

SELECT * FROM departments;



       

