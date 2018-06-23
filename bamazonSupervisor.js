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
    start();
});

function start() {
    inquirer.prompt([{
        type: "list",
        name: "doThing",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department", "End Session"]
    }]).then(function(ans) {
        switch (ans.doThing) {
            case "View Product Sales by Department":
                viewProductByDept();
                break;
            case "Create New Department":
                createNewDept();
                break;
            case "Exit":
                exit();
        }
    });
}

// function that makes a sql query to display all products to the user
function viewProductByDept() {
    console.log('**************************\n');
    console.log("BAMAZON Store\n");
    console.log('**************************\n');
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        console.log('Products Inventory\n');

        console.log('CALCULATE TOTAL PROFIT');

        var values = [];
        for (var i = 0; i < res.length; i++) {
            values.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit]);
        }
        var tableHeader = ["ID", "department_name", "over_head_costs", "product_sales", "total_profit"];
        console.table(tableHeader, values);

    });

};

function createNewDept() {
    console.log('departement created');
};

function exit() {
    console.log('Thank you for visiting BAMAZON store!');
    connection.end();
};