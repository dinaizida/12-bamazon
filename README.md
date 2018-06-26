## Project Name

12-bamazon

### Project Description:
This is an Amazon-like storefront using MySQL and Node.js. The app will take in orders from customers and deplete stock from the store's inventory. 

#### Files:

bamazonCustomer.js
 - Prints the products in the store.
 - Prompts customer which product they would like to purchase by ID number.
 - Asks for the quantity.
     * If there is a sufficient amount of the product in stock, it will return the total for that purchase.
     * If there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
     * If the purchase goes through, it updates the stock quantity to reflect the purchase.
     * It will also update the product sales in the department table.

bamazonManager.js
 - Starts with a menu:
     * View Products for Sale
     * View Low Inventory
     * Add to Inventory
     * Add New Product
     * Exit
 - If the manager selects View Products for Sale, it lists all of the products in the store including all of their details.
 - If the manager selects View Low Inventory, it'll list all the products with less than five items in its StockQuantity column.
 - If the manager selects Add to Inventory, it allows the manager to select a product and add inventory.
 - If the manager selects Add New Product, it allows the manager to add a new product to the store.
 - If the manager selects Exit, it ends the session and doesn't go back to the menu.     

bamazonSupervisor.js
 - Starts with a menu:
     * View Product Sales by Department
     * Create New Department
     * Exit
  - If the Supervisor selects View Product Sales by Department, it lists the Department - Sales and calculates the total sales from the overhead cost and product sales.
  - If the Supervisor selects Create New Department, it allows the manager to create a  new department and input current overhead costs and product sales. If there are none, by default it will set at 0.
  - If the Supervisor selects Exit, it ends the session and doesn't go back to the menu.

### Technologies Used: 

NODE.js, MySQL NPM package, Inquire NPM package. 

bamazonCustomer.js

![Screen Shot](https://github.com/dinaizida/12-bamazon/blob/master/assets/images/customer.gif)


bamazonManager.js

![Screen Shot](https://github.com/dinaizida/12-bamazon/blob/master/assets/images/manager.gif)

bamazonSupervisor.js

![Screen Shot](https://github.com/dinaizida/12-bamazon/blob/master/assets/images/supervisor.gif)