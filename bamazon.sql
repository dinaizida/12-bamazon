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
VALUES ("Baby Formula", "Baby", 12.50, 300),
       ("Pacifier", "Baby", 2.50, 300),
       ("Baby Wipes", "Baby", 2.00, 300),
       ("Cat Food", "Pet", 20.00, 100),
       ("Dog Food", "Pet", 25.00, 100),
       ("Milk", "Food", 6.00, 400),
       ("Cheese", "Food", 3.00, 400),
       ("Yogurt", "Food", 5.00, 400),
       ("Table", "Furniture", 100.00, 20),
       ("Chair", "Furniture", 50.00, 20);

SELECT * FROM products;





       

