var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require("console.table"); //to display inventory in a table format

var divider = '**************************\n';

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
    start();

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
};


// for (var i = 0; i < res.length; i++) {
//     values.push([res[i].id, res[i].product, res[i].department, res[i].price, res[i].quantity, res[i].product_sales]);
// }
// var tableHeader = ["ID", "Product", "Department", "Price ($)", "Quantity Available", "Product Sales"];   

function viewProductForSale() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(divider);
        console.log("BAMAZON Store Managers Portal\n");
        console.log(divider);
        console.log('Current Products Inventory\n');
        var values = [];
        for (var i = 0; i < res.length; i++) {
            values.push([res[i].id, res[i].product, res[i].department, res[i].price, res[i].quantity, res[i].product_sales]);
        }
        var tableHeader = ["ID", "Product", "Department", "Price ($)", "Quantity Available", "Product Sales"];
        console.table(tableHeader, values);
        console.log(divider);
        start();
    });
};

function ViewLowInventory() {
    console.log(divider);
    console.log('The following products have low inventory : \n');
    connection.query("SELECT * FROM products WHERE quantity < 5", function(err, res) {
        if (err) throw err;
        var values = [];
        for (var i = 0; i < res.length; i++) {
            values.push([res[i].id, res[i].product, res[i].department, res[i].price, res[i].quantity, res[i].product_sales]);
        }
        var tableHeader = ["ID", "Product", "Department", "Price ($)", "Quantity Available", "Product Sales"];
        console.table(tableHeader, values);
        console.log(divider);
        start();
    });
};

function AddToInventory() {
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "Please enter the ID number of the product you would like to update : "
    }, {
        type: "input",
        name: "quantity",
        message: "How many items you want to add to the current supply?"
    }]).then(function(answers) {

        idSelected = answers.id; //manager choice
        quantitySelected = answers.quantity; // manager choice
        connection.query("UPDATE products SET quantity = quantity + ? WHERE id = ?", [quantitySelected, idSelected],
            function(err, res) {
                if (err) throw err;
                //select a product name that was updated to print it out
                connection.query("SELECT * FROM products WHERE id = ?", [idSelected],
                    function(err, res) {
                        if (err) throw err;
                        console.log(divider);
                        console.log('Inventory has been updated for ' + res[0].product + '!\n');
                        console.log(divider);
                        start();
                    });
            });

    });
}

function AddNewProduct() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Please enter the product name : "
    }, {
        name: "dept",
        type: "input",
        message: "Please enter the department name : "
    }, {
        name: "price",
        type: "input",
        message: "Please enter the product's price : "
    }, {
        name: "quantity",
        type: "input",
        message: "Please enter the quantity of the product : "
    }]).then(function(answer) {
        connection.query("INSERT INTO products SET ?", {
                product: answer.name,
                department: answer.dept,
                price: answer.price,
                quantity: answer.quantity
            },
            function(err, res) {
                if (err) throw err;

                console.log(divider);
                console.log(answer.name + ' was successfully added to the inventory!\n');
                console.log(divider);
                start();
            });
    });
};

function exit() {
    console.log('Thank you for Managing BAMAZON store!\n');
    console.log(divider);
    connection.end();
};