var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require("console.table"); //to display inventory in a table format
var idSelected = 0;
var quantitySelected = 0;
var totalProductPrice = 0;
var totalPrice = 0;

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
    askUserToStart();
});

//starts the app and asks the user if they would like to view the store
function askUserToStart() {
    console.log("\nWELCOME TO THE BAMAZON STORE!\n");
    inquirer.prompt([{
        type: "confirm",
        name: "wantToView",
        message: "Would you like to view the available products?",

    }]).then(function(answers) {
        if (answers.wantToView) {
            viewProducts();
            //setTimeout(askUser, 1000);
        } else {
            exit();

        }
    });
}

// function that makes a sql query to display all products to the user
// in real life environemt we normall do not display the whole database, this is just for this app as an example
function viewProducts() {
    console.log('**************************\n');
    console.log("BAMAZON Store\n");
    console.log('**************************\n');
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log('Current Products Inventory\n');
        var values = [];
        for (var i = 0; i < res.length; i++) {
            values.push([res[i].id, res[i].product, res[i].department, res[i].price, res[i].quantity]);
        }
        var tableHeader = ["ID", "Product", "Department", "Price ($)", "Quantity"];
        console.table(tableHeader, values);
        askUser()
    });

};

function askUser() {

    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "Please enter the ID number of the product you would like to buy.",
        // to validate a number entered
        validate: function(value) {
            if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
                return true;
            } else {
                console.log('\nPlease enter a valid item ID\n');
            }
        }

    }, {
        type: "input",
        name: "quantity",
        message: "How many items you want to buy?",
        validate: function(value) {
            if (isNaN(value)) {
                console.log('\nPlease enter a valid quantity number\n');
            } else {
                return true;
            }
        }
    }]).then(function(answers) {
      idSelected = answers.id;//user choice
      quantitySelected = answers.quantity; // user choice
      connection.query("SELECT * FROM products WHERE id = " + idSelected , function(err, res) {
        if (err) throw err; 
        if(quantitySelected > res[0].quantity){
         console.log('\nInsufficient Quantitiy. Currently in stock : ' + res[0].quantity
          + 'items'+'\nPlease choose less amount of the selected product.');
        }
        else{
          // user prompt to ask if user wants to buy more or not
          //if user wants to buy more, call askUser()
          //if user does not want to buy more, call processOrder()
          inquirer.prompt([{
            type: "confirm",
            name: "buyMore",
            message: "Do you want to purchase more items?",
        }]).then(function(answersMore) {
            if (answersMore.buyMore) {
              totalProductPrice = quantitySelected * res[0].price;
              console.log("\nYour total price for " + res[0].product + " " + res[0].price + " is " + totalProductPrice);
              totalPrice = totalPrice + totalProductPrice;
    
              askUser();
            } else {
              
              totalProductPrice = quantitySelected * res[0].price;
              console.log("\nYour total price for " + res[0].product + " " + res[0].price + " is " + totalProductPrice);
              totalPrice = totalPrice + totalProductPrice;


              console.log("\nPlease review your order:  Total Price ($) " + totalPrice +".");
              exit();
              //processOrder(idSelected, quantitySelected, totalProductPrice, res);
            };
        });
         
        }
       // askUser();
      });
    });

};

function processOrder(userIdPar, userQuantityPar, productPrice, data){

  console.log('total price for purchase');

  var totalPrice = userQuantityPar * data[0].price;

  console.log("\nPlease review your order:  Total Price ($) " + totalPrice +".");

  updateDataProducts(userIdPar, userQuantityPar, data);

  //add function to update product sales column
  // calculate total here

}
function updateDataProducts(userIdChoice, userQuantityChoice, data){
  console.log(userIdChoice + userQuantityChoice + data);

  // update database information

  
  
};
function exit() {
    console.log('Thank you for visiting BAMAZON store!');
    connection.end();
};