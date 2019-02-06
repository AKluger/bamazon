var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "yourRootPassword",
    database: "bamazon"
});


function showProducts()  {
    console.log("Displaying All Products....");
    connection.query("SELECT item_id, product_name, price FROM products ", function(err, res)  {
        if (err) throw err;

        console.log(res);
        connection.end();
    });

}


function bamazonShop()  {
    showProducts();
    connection.query("SELECT price FROM products", function(err, res)  {
        if (err) throw err;
    inquirer.prompt([

        {
            type: "input",
            name: "id",
            message: "Please enter the item-id of the product you would like to buy:"
        },

        {type: "input",
        name: "quantity",
        message: "Please enter a quantity for purchase:"}
    ])
    .then(function(answer)    {
        console.log(res[1].stock_quantity)
        // if (answer.quantity>())   {
        //     console.log(inquirerResponse.)
        // }
        connection.end();
    })
})
}

bamazonShop();