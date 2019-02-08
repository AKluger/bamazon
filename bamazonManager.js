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

function startMenu()    {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "What would you like to do, please select from the options below:",
        choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function(answer)  {
        // depending on user choice run relevant function
        if (answer.options === "View Products")
            {showProducts()}
        else if (answer.options === "View Low Inventory")
            {lowInventory()}
        else if (answer.options === "Add to Inventory")
            {}
        else if (answer.options === "Add New Product")
            {addItem()}
        else  { connection.end();}
    })
}

// query to select id name price and quantity
function showProducts() {
    console.log("\nDisplaying All Products....");
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products ", function (err, res) {
        if (err) throw err;
        // for (var i = 0; i<res.length; i++)
        console.log(JSON.stringify(res)+ "\n");
        startMenu();
    });
}

// query to select items WHERE stock_quantity < 5
function lowInventory() {
    console.log("\nDisplaying products with low inventory...");
    connection.query("SELECT * FROM products WHERE (stock_quantity < 5)", function (err, res)  {
        if (err) throw err;
        for (var i = 0; i<res.length; i++)
        {console.log(JSON.stringify(res[i].product_name) +"  Current Inventory: "+JSON.stringify(res[i].stock_quantity))}
    })
    connection.end();
}

// function to add inventory, get item by id then increase stock_quantity by user input parseInt REPLACE




// function to add a new item, INSERT INTO products
function addItem() {
    // prompt for info about the item being put up for auction
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
          validate: function(value) {
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
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.item,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity 
          },
          function(err) {
            if (err) throw err;
            console.log("Your item has been added to bamazon.");
            // re-prompt manager for a new selection
            startMenu();
          }
        );
      });
  }




