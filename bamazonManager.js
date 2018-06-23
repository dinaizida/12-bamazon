var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require("console.table"); //to display inventory in a table format
var idSelected = 0;
var quantitySelected = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

// connects to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    viewProducts();
    
});


function start() {
    inquirer.prompt([{
        type: "list",
        name: "doThing",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    }]).then(function(ans) {
        switch (ans.doThing) {
            case "View Products for Sale":
                viewProductForSale();
                break;
            case "View Low Inventory":
                ViewLowInventory();
                break;
            case "Add to Inventory":
                AddToInventory();
            break;    
            case "Add New Product":
               AddNewProduct();
            break;
            case "Exit":
                exit();
        }
    });
}

// function that makes a sql query to display all products to the user
function viewProducts() {
    console.log('**************************\n');
    console.log("BAMAZON Store\n");
    console.log('**************************\n');
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log('Current Products Inventory\n');
        var values = [];
        for (var i = 0; i < res.length; i++) {
            values.push([res[i].id, res[i].product, res[i].department, res[i].price, res[i].quantity, res[i].product_sales]);
        }
        var tableHeader = ["ID", "Product", "Department", "Price ($)", "Quantity", "PRODUCT SALES"];
        console.table(tableHeader, values);
        start();
    });

};

function viewProductForSale() {
    viewProducts();
    console.log('viewProductForSale()');
};

function ViewLowInventory() {
    console.log('The following products have low inventory: ');

    start()
};
function AddToInventory() {
    console.log('New Product ' + product name +  "added to product inventory.");
    start()
};
function viewProductForSale() {
    console.log('viewProductForSale()');
    start()
};
function AddNewProduct() {
    console.log('AddNewProduct()');
    start()
};
function exit() {
    console.log('Thank you for visiting BAMAZON store!');
    connection.end();
};