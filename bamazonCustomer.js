var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "yourRootPassword",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the showProducts function after the connection is made to prompt the user
    showProducts();
  });

function showProducts() {
    console.log("Displaying All Products....");
    connection.query("SELECT item_id, product_name, price FROM products ", function (err, res) {
        if (err) throw err;

        console.log(res);
        bamazonShop();
        // connection.end();
       
    });

    

}


function bamazonShop() {
  
        inquirer.prompt([

            {
                type: "input",
                name: "id",
                message: "Please enter the item-id of the product you would like to buy:"
            },

            {
                type: "input",
                name: "quantity",
                message: "Please enter a quantity for purchase:"
            }
        ])
            .then(function (answer) {
                
               
                connection.query("SELECT * FROM products WHERE ?",
                    {
                        item_id : answer.id},
                    function (err, res) {
                        if (err) throw err;
                        // if (answer.quantity > res.stock_quantity) {
                        console.log(res.stock_quantity);   
                         connection.end();
                        // }
                 })
             })
        }

// bamazonShop();