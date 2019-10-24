var mysql = require("mysql");
var inquirer = require("inquirer");

// Setting up MySQL connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});


connection.connect(function(){
    displayAll();
});

function displayAll(){
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;

        // character length variables
        var idLength = 0;
        var idSpace = 0;
        var productNameLength = 0;
        var productNameSpace = 0;
        var departmentNameLength = 0;
        var departmentNameSpace = 0;
        var priceLength = 0;
        var priceSpace = 0;
        var stockQuantityLength = 0;
        var stockQuantitySpace = 0;
        var totalLength = 0;
        var totalSpace = 0;
        
        // finds the value with the longest character length from each collumn 
        for(var i = 0; i < results.length; i++){
            if(results[i].item_id.toString().length > idLength){
                idLength = results[i].item_id.toString().length;
                idSpace = "\xa0".repeat(idLength);
            }
            if(results[i].product_name.length > productNameLength){
                productNameLength = results[i].product_name.length;
                productNameSpace ="\xa0".repeat(productNameLength);
            }
            if(results[i].department_name.length > departmentNameLength){
                departmentNameLength = results[i].department_name.length;
                departmentNameSpace = "\xa0".repeat(departmentNameLength);
            }
            if(results[i].price.toString().length > priceLength){
                priceLength = results[i].price.toString().length;
                priceSpace = "\xa0".repeat(priceLength);
            }
            if(results[i].stock_quantity.toString().length > stockQuantityLength)
                stockQuantityLength = results[i].stock_quantity.toString().length;
                stockQuantitySpace = "\xa0".repeat(stockQuantityLength);
        }
        totalLength = idLength + productNameLength + departmentNameLength + priceLength + stockQuantityLength + 19;
        for(var i = 0; i < totalLength; i++){
            process.stdout.write("_");
        }
        console.log("");
        for(var i = 0; i < results.length; i++){
            console.log("| " + results[i].item_id + idSpace + "|" + results[i].product_name + productNameSpace + "|");
            // console.log("| " + results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quanity + " |");
        }
        for(var i = 0; i < totalLength; i++){
            process.stdout.write("_");
        }
    });
    connection.end();
}
