var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require("console.table");//to display inventory in a table format
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
	askUserToStart();
});

//starts the app and asks the user if they would like to view the store
function askUserToStart() {
	console.log("\nWELCOME TO THE BAMAZON STORE!\n");
	inquirer.prompt([
		{
      type: "confirm",
      name: "wantToView",
      message: "Would you like to view the available products?",
     
		}
  ]).then(function(answers) {
		if (answers.wantToView) {
      viewProducts();
      setTimeout(askUser, 1000);
		} else {
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
      console.log('Products Inventory\n');
      var values =[];
      for(var i = 0; i < res.length; i++){
        values.push([res[i].id, res[i].product, res[i].department, res[i].price, res[i].quantity]);
      }
      var tableHeader = ["ID", "Product", "Department", "Price", "Quantity"];
      console.table(tableHeader, values);
    });
  };
  
  function askUser(){

    inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Please enter the ID number of the product you would like to buy.",
        // to validate a number entered
        validate: function(value) {
          if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
            return true;
          }
          else { console.log('\nPlease enter a valid item ID\n');}
        }

      }, {
        type: "input",
        name: "quantity",
        message: "How many items you want to buy?",
        validate: function(value) {
          if (isNaN(value)) {
            console.log('\nPlease enter a valid quantity number\n');
            
          }
          else { return true;}
        }
      }
    ]).then(function(answers) {
           idSelected = answers.id;
           quantitySelected = answers.quantity;
           console.log("idSelected + quantitySelected" +idSelected + quantitySelected);
      
        
    });

  };
  
 
  function exit(){
    console.log('Thank you for visiting BAMAZON store!');
    connection.end();
  };
