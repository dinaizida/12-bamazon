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
       ("Yogurt", "Food", 5.00, 400),
       ("Table", "Furniture", 100.00, 20),
       ("Chair", "Furniture", 50.00, 20);

SELECT * FROM products;

CREATE TABLE departments(
	department_id INTEGER AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs DECIMAL (10,2) NOT NULL,L,
	product_sales DECIMAL (10,2) DEFAULT 0,
	total_profit DECIMAL (10,2) DEFAULT 0,
	PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, over_head_costs, product_sales, total_profit)
VALUES ("Baby", 1000, 2000,0),
("Pet", 3000, 4000,0),
("Food", 5000, 6000,0),
("Furniture", 7000, 8000,0);

SELECT * FROM departments;



       

