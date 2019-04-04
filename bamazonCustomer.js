var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
// your database password will need to be changed below
    password: "myRootPassword",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the showProducts function after the connection is made to prompt the user
    showProducts();
});

function showProducts() {
    console.log("\nDisplaying All Products as follows:\nID || Name || Price\n");
    connection.query("SELECT item_id, product_name, price FROM products ", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++)
            console.log(JSON.stringify(res[i].item_id) + "  || " + JSON.stringify(res[i].product_name) + " || " + JSON.stringify(res[i].price));
        bamazonShop();


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
            message: "Please enter a quantity for purchase:",
            validate: function (value) {
                if ((isNaN(value) === false) && (value > 0)) {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answer) {


            connection.query("SELECT * FROM products WHERE ?",
                // find the item user has selected and compare quantity vs stock
                {
                    item_id: answer.id
                },
                function (err, res) {
                    if (err) throw err;
                    var chosenItem = res[0];
                    if (parseInt(answer.quantity) <= chosenItem.stock_quantity) {

                        connection.query(
                            "UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?",
                            [(res[0].stock_quantity - answer.quantity),
                            (res[0].product_sales + (res[0].price * answer.quantity)),

                            answer.id
                            ],
                            function (error) {
                                if (error) throw err;
                                console.log("\n Thank you, your total today is $" + (answer.quantity * res[0].price) + ".  Please come again.")
                            }
                        )
                        connection.end();
                    }


                    else {
                        console.log("Insufficient quantity ¯|_(ツ)_/¯")
                        connection.end();
                    }

                })
        })
}


