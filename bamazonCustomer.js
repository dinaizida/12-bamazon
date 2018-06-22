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
          console.log('Thank you for visiting BAMAZON store!');
          connection.end();

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
            values.push([res[i].id, res[i].product, res[i].department, res[i].price, res[i].quantity, res[i].product_sales]);
        }
        var tableHeader = ["ID", "Product", "Department", "Price ($)", "Quantity", "PRODUCT SALES"];
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
                console.log('\nPlease enter a valid item ID (current inventory has only 10 products for sale).\n');
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
        idSelected = answers.id; //user choice
        quantitySelected = answers.quantity; // user choice
        connection.query("SELECT * FROM products WHERE id = " + idSelected, function(err, res) {
            if (err) throw err;

            if (quantitySelected > res[0].quantity) {
                console.log('\nInsufficient Quantitiy. Currently in stock : ' + res[0].quantity + ' items ' + '\nPlease choose different amount of the selected product.');
                // prompt user again to enter different amout of the selected product

                inquirer.prompt([{
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
                    console.log('quantitySelected -- ' + quantitySelected);
                    quantitySelected = answers.quantity;
                    console.log('quantitySelected --AFTER fixed-- ' + quantitySelected);
                    askUserToBuyMore(idSelected,quantitySelected,res);
                });

            } else {
                // user prompt to ask if user wants to buy more or not
                //if user wants to buy more, call askUser()
                //if user does not want to buy more, call processOrder()

                askUserToBuyMore(idSelected,quantitySelected,res);

            }

        });
    });

};

function askUserToBuyMore(userIdPar, userQuantityPar, data){

        inquirer.prompt([{
          type: "confirm",
          name: "buyMore",
          message: "Do you want to purchase more items?",
      }]).then(function(answersMore) {
          if (answersMore.buyMore) { // if user wants to buy more products
              // console.log('userIdPar-- ' + userIdPar);
              // console.log('userQuantityPar-- ' + userQuantityPar);
              // console.log('totalProductPrice-- ' + totalProductPrice);
              
              totalProductPrice = userQuantityPar * data[0].price;
              console.log("\nYour Total Price($) for " + data[0].product + " " + data[0].price + " : " + totalProductPrice);
              totalPrice = totalPrice + totalProductPrice;
               
              updateDataProducts(userIdPar, userQuantityPar, totalProductPrice, data); // update Database
              askUser();
          } else {// if user does not want to buy more products

              totalProductPrice = userQuantityPar * data[0].price;
              console.log("\nYour Total Price($) for " + data[0].product + " " + data[0].price + " : " + totalProductPrice);
              totalPrice = totalPrice + totalProductPrice;

              console.log("\nPlease review your order:  Total Order Price($): " + totalPrice + ".");

              updateDataProducts(userIdPar, userQuantityPar, totalProductPrice, data);// update database, 


          };
      });
}
// function processOrder(userIdPar, userQuantityPar, productPrice, data) {

//     console.log('total price for purchase');

//     var totalPrice = userQuantityPar * data[0].price;

//     console.log("\nPlease review your order:  Total Price ($) " + totalPrice + ".");

//     updateDataProducts(userIdPar, userQuantityPar, data);

    //add function to update product sales column
    // calculate total here

//}

function updateDataProducts(userIdChoice, userQuantityChoice, soldProductPrice, data) {

    console.log('// update database information');
    console.log("userIdChoice + userQuantityChoice + data---   " + userIdChoice + userQuantityChoice + data);

    // update database information
        var updatedQuantity = data[0].quantity - userQuantityChoice;
        var query = connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              quantity: updatedQuantity,
              product_sales: soldProductPrice
            },
            {
              id: userIdChoice
            }
          ],
          function(err, res) {
            console.log(res.affectedRows + " products updated!\n");

            exit();
            //askUser();



            // console.log('Thank you for visiting BAMAZON store!');
            // connection.end();
           
          }
        );

};

function exit(){

            console.log('Thank you for visiting BAMAZON store!');
            connection.end();
}
