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
                    'View Product Sales by Department',
                    'Create New Department',
                ]
            }])
            .then(answers => {
                if (answers.option == 'View Product Sales by Department')
                    viewSales();
                if (answers.option == 'Create New Department')
                    createNewDepartment();
            });
    }, 100);
}

function viewSales() {
    connection.query(
        //Full Outer Join
        "SELECT d.department_id, d.department_name, d.over_head_costs, p.product_sales, p.product_sales - d.over_head_costs AS total_profit FROM departments d LEFT JOIN products p ON d.department_name = p.department_name UNION SELECT d.department_id, d.department_name, d.over_head_costs, p.product_sales, p.product_sales - d.over_head_costs AS total_profit FROM departments d RIGHT JOIN products p ON d.department_name = p.department_name",
        function (error, results) {
            if (error) throw error;

            //Column width starts out as the size of the table headers
            var columnWidth = [];
            for (var i = 0; i < Object.keys(results[0]).length; i++) {
                columnWidth[i] = Object.keys(results[0])[i].length;
            }

            //Finds the value with the longest character length from each collumn 
            for (var i = 0; i < results.length; i++) {
                for (var j = 0; j < Object.keys(results[0]).length; j++) {
                    if(Object.values(results[i])[j] == null)
                        break;
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
                    if(Object.values(results[i])[j] == null)
                        var temp = Object.values(results[i])[j] + "\xa0".repeat(columnWidth[j] - 4) + " ║ ";
                    else
                    var temp = Object.values(results[i])[j] + "\xa0".repeat(columnWidth[j] - Object.values(results[i])[j].toString().length) + " ║ ";
                    if (j == Object.values(results[i]).length - 1 && i !== results.length - 1) {
                        temp += "\n║ ";
                    }
                    valuesString += temp;
                }
            }
            console.log(valuesString);
            console.log("╚" + "═".repeat(headerString.length - 4) + "╝\n");
        }
        );
        prompt();
}

function createNewDepartment() {
    setTimeout(function () {
        inquirer
            .prompt([
                {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the new department?',
                },
                {
                type: 'input',
                name: 'overhead',
                message: 'What is the overhead cost of this department?',
                }
            ])
            .then(answers => {
                connection.query(
                    "INSERT INTO departments (department_name, over_head_costs) VALUES ('" + answers.departmentName + "', " + answers.overhead + ")",
                    function (error) {
                        if (error) throw error;                        
                    }
                    );
                    prompt();
            });
    }, 100);
}