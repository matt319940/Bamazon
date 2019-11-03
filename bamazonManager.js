var mysql = require("mysql");
var inquirer = require("inquirer");

// Setting up MySQL connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function () {
    prompt();
});

function prompt() {
    setTimeout(function () {
        inquirer
            .prompt([{
                type: 'list',
                name: 'option',
                message: 'What would you like to do?',
                choices: [
                    'View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product'
                ]
            }])
            .then(answers => {
                if (answers.option == 'View Products for Sale')
                    viewAll();
                if (answers.option == 'View Low Inventory')
                    viewLow();
                if (answers.option == 'Add to Inventory')
                    addInventory();
                if (answers.option == 'Add New Product')
                    addProduct();

            });
    }, 100);
}

function viewAll() {
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;

        //Column width starts out as the size of the table headers
        var columnWidth = [];
        for (var i = 0; i < Object.keys(results[0]).length; i++) {
            columnWidth[i] = Object.keys(results[0])[i].length;
        }

        //Finds the value with the longest character length from each collumn 
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < Object.keys(results[0]).length; j++) {
                if (Object.values(results[i])[j].toString().length > columnWidth[j]) {
                    columnWidth[j] = Object.values(results[i])[j].toString().length
                }
            }
        }

        //Console logs the headers
        var headerString = "\n│ ";
        for (var i = 0; i < Object.keys(results[0]).length; i++) {
            var temp = Object.keys(results[0])[i] + "\xa0".repeat(columnWidth[i] - Object.keys(results[0])[i].toString().length) + " │ ";
            headerString += temp;
        }
        console.log(headerString);
        console.log("╔" + "═".repeat(headerString.length - 4) + "╗");

        //Console logs the table
        var valuesString = "║ ";
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < Object.values(results[i]).length; j++) {
                var temp = Object.values(results[i])[j] + "\xa0".repeat(columnWidth[j] - Object.values(results[i])[j].toString().length) + " ║ ";
                if (j == Object.values(results[i]).length - 1 && i !== results.length - 1) {
                    temp += "\n║ ";
                }
                valuesString += temp;
            }
        }
        console.log(valuesString);
        console.log("╚" + "═".repeat(headerString.length - 4) + "╝" + "\n");

    });

    prompt();
}

function viewAllMinusPrompt() {
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;

        //Column width starts out as the size of the table headers
        var columnWidth = [];
        for (var i = 0; i < Object.keys(results[0]).length; i++) {
            columnWidth[i] = Object.keys(results[0])[i].length;
        }

        //Finds the value with the longest character length from each collumn 
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < Object.keys(results[0]).length; j++) {
                if (Object.values(results[i])[j].toString().length > columnWidth[j]) {
                    columnWidth[j] = Object.values(results[i])[j].toString().length
                }
            }
        }

        //Console logs the headers
        var headerString = "\n│ ";
        for (var i = 0; i < Object.keys(results[0]).length; i++) {
            var temp = Object.keys(results[0])[i] + "\xa0".repeat(columnWidth[i] - Object.keys(results[0])[i].toString().length) + " │ ";
            headerString += temp;
        }
        console.log(headerString);
        console.log("╔" + "═".repeat(headerString.length - 4) + "╗");

        //Console logs the table
        var valuesString = "║ ";
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < Object.values(results[i]).length; j++) {
                var temp = Object.values(results[i])[j] + "\xa0".repeat(columnWidth[j] - Object.values(results[i])[j].toString().length) + " ║ ";
                if (j == Object.values(results[i]).length - 1 && i !== results.length - 1) {
                    temp += "\n║ ";
                }
                valuesString += temp;
            }
        }
        console.log(valuesString);
        console.log("╚" + "═".repeat(headerString.length - 4) + "╝\n");

    });
}

function viewLow() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (error, results) {
        if (error) throw error;

        if(results[0] == undefined){
            console.log("\nYou have no low inventory!\n");
            return;
        }

        //Column width starts out as the size of the table headers
        var columnWidth = [];
        for (var i = 0; i < Object.keys(results[0]).length; i++) {
            columnWidth[i] = Object.keys(results[0])[i].length;
        }

        //Finds the value with the longest character length from each collumn 
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < Object.keys(results[0]).length; j++) {
                if (Object.values(results[i])[j].toString().length > columnWidth[j]) {
                    columnWidth[j] = Object.values(results[i])[j].toString().length
                }
            }
        }

        //Console logs the headers
        var headerString = "\n│ ";
        for (var i = 0; i < Object.keys(results[0]).length; i++) {
            var temp = Object.keys(results[0])[i] + "\xa0".repeat(columnWidth[i] - Object.keys(results[0])[i].toString().length) + " │ ";
            headerString += temp;
        }
        console.log(headerString);
        console.log("╔" + "═".repeat(headerString.length - 4) + "╗");

        //Console logs the table
        var valuesString = "║ ";
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < Object.values(results[i]).length; j++) {
                var temp = Object.values(results[i])[j] + "\xa0".repeat(columnWidth[j] - Object.values(results[i])[j].toString().length) + " ║ ";
                if (j == Object.values(results[i]).length - 1 && i !== results.length - 1) {
                    temp += "\n║ ";
                }
                valuesString += temp;
            }
        }
        console.log(valuesString);
        console.log("╚" + "═".repeat(headerString.length - 4) + "╝\n");

    });

    prompt();
}

function addInventory() {

    viewAllMinusPrompt();

    setTimeout(function () {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'What is the ID of the product you would like to add to?',
                    filter: Number
                },
                {
                    type: 'input',
                    name: 'units',
                    message: 'How many would you like to add?',
                    filter: Number
                },
            ])
            .then(answers => {
                connection.query(
                    "UPDATE products SET stock_quantity = stock_quantity + " + answers.units + " WHERE item_id = " + answers.id,
                    function (error) {
                        if (error) throw error;
                    }
                );
                viewAll();
            });
    }, 100);
}

function addProduct(){

    viewAllMinusPrompt();

    setTimeout(function () {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is name of the product you would like to add?',
                },
                {
                    type: 'input',
                    name: 'department',
                    message: 'What department does it belong to?',
                },
                {
                    type: 'input',
                    name: 'price',
                    message: 'What is the price?',
                    filter: Number
                },
                {
                    type: 'input',
                    name: 'quantity',
                    message: 'How many would you like to keep in stock?',
                    filter: Number
                },
            ])
            .then(answers => {
                connection.query(
                    "INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) " + 
                    "VALUES('" + answers.name + "', '" + answers.department + "', " + answers.price + ", " + answers.quantity + ", " + 0 + ")",
                    function (error) {
                        if (error) throw error;
                    }
                );
                viewAll();
            });
    }, 100);
    
}