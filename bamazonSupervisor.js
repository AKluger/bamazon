var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
// your database password will need to be changed below
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
        choices: ["View Product Sales By Department", "Create New Department"]
    }).then(function (answer) {
        // depending on user choice run relevant function
        if (answer.options === "View Product Sales By Department") { viewSales() }
        else if (answer.options === "Create New Department") { createNew() }
        else { connection.end(); }
    })
}

function viewSales() {
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;

        connection.query("SELECT department_name, SUM(product_sales) AS sales FROM products GROUP BY department_name;", function (err, res) {
            if (err) throw err;

            var table = new Table({
                head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit']
                , colWidths: [20, 20, 20, 20, 20]
            });

            for (var i = 0; i < (results.length - 1); i++) {
                var row = results[i];
                var sales = res[i].sales;
                var profit = (sales - row.over_head_costs)
                table.push([row.department_id,
                row.department_name,
                row.over_head_costs,
                    sales,
                    profit])

            }
            console.log(table.toString());
        })
    })
}


function createNew() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "Please provide a name for the new department:"
            },
            {
                name: "costs",
                type: "input",
                message: "What are the overhead costs?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO departments SET ?",
                {

                    department_name: answer.name,
                    over_head_costs: answer.costs

                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department has been added to bamazon.\n");
                    // re-prompt manager for a new selection
                    startMenu();
                }
            );
        });
}