var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "yourRootPassword",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    startMenu();
});

function startMenu() {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "What would you like to do, please select from the options below:",
        choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answer) {
        // depending on user choice run relevant function
        if (answer.options === "View Products") { showProducts() }
        else if (answer.options === "View Low Inventory") { lowInventory() }
        else if (answer.options === "Add to Inventory") { addInventory() }
        else if (answer.options === "Add New Product") { addItem() }
        else { connection.end(); }
    })
}

// query to select id name price and quantity
function showProducts() {
    console.log("\nDisplaying All Products....");
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products ", function (err, res) {
        if (err) throw err;
        // for (var i = 0; i<res.length; i++)
        console.log(JSON.stringify(res) + "\n");
        startMenu();
    });
}

// query to select items WHERE stock_quantity < 5
function lowInventory() {
    console.log("\nDisplaying products with low inventory...");
    connection.query("SELECT * FROM products WHERE (stock_quantity < 5)", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) { console.log(JSON.stringify(res[i].product_name) + "  Current Inventory: " + res[i].stock_quantity) + "\n" }
        startMenu();
    })
}

// function to add inventory
function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                },
                message: "Please select a product to adjust inventory:"
            },
            {
                type: "input",
                name: "quantity",
                message: "How many units would you like to add to inventory?:",
                validate: function (value) {
                    if ((isNaN(value) === false) && (value > 0)) {
                        return true;
                    }
                    return false;
                }
            }
        ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                        var newQuantity = (chosenItem.stock_quantity + parseInt(answer.quantity))
                    }
                }
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{ stock_quantity: newQuantity },

                    { product_name: chosenItem.product_name }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("\n Thank you, the inventory has been updated to " + newQuantity)
                        // startMenu();
                    }
                )
                connection.end();
            }
            )
    })
}

// function to add a new item
function addItem() {
    // prompt for info about the item 
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the item you would like to add?"
            },
            {
                name: "department",
                type: "input",
                message: "What department would you like to place your item in?"
            },
            {
                name: "price",
                type: "input",
                message: "What will the price be per item?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many of the item would you like to stock?"
            },
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.item,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your item has been added to bamazon.");
                    // re-prompt manager for a new selection
                    startMenu();
                }
            );
        });
}




