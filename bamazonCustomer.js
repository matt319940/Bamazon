var mysql = require("mysql");
var inquirer = require("inquirer");
var total = 0;

// Setting up MySQL connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function(){
    displayAllCustomer();
    prompt();
});

// Function for displaying table
function displayAllCustomer() {
    
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;

        //Column width starts out as the size of the table headers
        var columnWidth = [];
        for (var i = 0; i < Object.keys(results[0]).length; i++) {
            columnWidth[i] = Object.keys(results[0])[i].length;
        }

        //Finds the value with the longest character length from each collumn 
        for (var i = 0; i < results.length; i++) {
            for(var j = 0; j < Object.keys(results[0]).length; j++){
                if(Object.values(results[i])[j].toString().length > columnWidth[j]){
                    columnWidth[j] = Object.values(results[i])[j].toString().length
                }
            }
        }

        //Console logs the headers
        var headerString = "\n| ";
        for(var i = 0; i < Object.keys(results[0]).length; i++){
            var temp = Object.keys(results[0])[i] + "\xa0".repeat(columnWidth[i] - Object.keys(results[0])[i].toString().length) + " | ";
            headerString += temp;
        }
        console.log(headerString);
        console.log("-".repeat(headerString.length));

        //Console logs the table
        var valuesString = "| ";
        for(var i = 0; i < results.length; i++){
            for(var j = 0; j < Object.values(results[i]).length; j++){
                var temp = Object.values(results[i])[j] + "\xa0".repeat(columnWidth[j] - Object.values(results[i])[j].toString().length) + " | ";
                if(j == Object.values(results[i]).length - 1 && i !== results.length - 1){
                    temp += "\n| ";
                }
                valuesString += temp;
            }
        }
        console.log(valuesString);
        console.log("-".repeat(headerString.length));
         
    });
}

//Inquirer questions
function prompt(){

    setTimeout(function(){
    inquirer
    .prompt([
                {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the product you would like to buy?',
            filter: Number
        },
        {
            type: 'input',
            name: 'units',
            message: 'How many would you like?',
            filter: Number
        },
        {
            type: 'list',
            name: 'continue',
            message: 'Would you like to continue?',
            choices: [
                'Continue?',
                'Exit?'
            ],
            filter: function(value){
                if(value == 'Exit?'){
                    connection.end();
                    process.exit();
                }
            }
        },
    ])
    .then(answers => {
        updateTable(answers);
    });
    }, 100); 
}

//Updates the table
function updateTable(answers){
    connection.query(
        "SELECT stock_quantity, price FROM products WHERE item_id = " + answers.id,
        function(error, results){
            if (error) throw error;
            
            var price = results[0].price;

            if(results[0].stock_quantity < answers.units){
                answers.units = 0;
                console.log("Insufficient quantity!");
                displayAllCustomer();
                prompt();
            }
            else
            connection.query(
                "UPDATE products SET stock_quantity = stock_quantity - " + answers.units + " WHERE item_id = " + answers.id,
                function(error) {
                  if (error) throw error;
                  total += answers.units * price;
                  console.log("You have spent $" + total);
                  console.log("Bid placed successfully!");
                  
                  displayAllCustomer();
                  prompt();
                }
            );
        }
    );

    
}

