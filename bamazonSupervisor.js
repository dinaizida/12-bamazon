var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require("console.table"); //to display inventory in a table format
var idSelected = 0;
var quantitySelected = 0;
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
    // console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer.prompt([{
        type: "list",
        name: "doThing",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department", "Exit"]
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
    console.log(divider);
    console.log("BAMAZON Store Supervisor Portal.\n");
    console.log(divider);
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;

        var values = [];
        for (var i = 0; i < res.length; i++) {
           
            var overHeadCost = res[i].over_head_costs;
            var productSales = res[i].product_sales;
            var totalProfit = productSales - overHeadCost;

            //update total_profit in the department table
            connection.query("UPDATE departments SET total_profit = total_profit + ? WHERE department_name = ?", [totalProfit, res[i].department_name],
            function(err, res) {
                if (err) throw err;
                // console.log(divider);
                // console.log('Sales Price has been updated for ' + productDepartment + ' department!\n');
                // console.log(divider);
            });


            values.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, totalProfit]);
        }
        var tableHeader = ["ID", "department_name", "over_head_costs", "product_sales", "total_profit"];
        console.table(tableHeader, values);
        console.log(divider);


        start();
    });

};

function createNewDept() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Please enter the department name : "
    }, {
        name: "costs",
        type: "input",
        message: "Please enter the overhead costs : "
    }]).then(function(answer) {
        connection.query("INSERT INTO departments SET ?", {
            department_name: answer.name,
            over_head_costs: answer.costs
            },
            function(err, res) {
                if (err) throw err;

                console.log(divider);
                console.log(answer.name + ' was successfully added!\n');
                console.log(divider);
                start();
            });
    });
};

function exit() {
    console.log(divider);
    console.log('Thank you for working with BAMAZON store!');
    console.log(divider);
    connection.end();
};