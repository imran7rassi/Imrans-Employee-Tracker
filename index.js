

// requires the data
// from current places //

const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
// terminal string styling
const chalk = require('chalk');
// implement FIGfont spec in Javascript
const figlet = require('figlet');
const { title } = require("process");

// this is the connection of the mysql
// with the username and password
// also the host and port

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "hi786123",
    database: "employee_Tracker"
});

// This is the initiating 
// for mysql connection

connection.connect((err) => {
    if(err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// this function is use to validate
// the first and last name in CLI

const responseValidation = function (input) {
    if (input === "") {
        console.log("This parameter cannot be empty!");
        return false;
    }

    return true;
};

// Welcome image for the users //

console.log(chalk.yellow.bold('======================================================================================================='));
console.log(``);
console.log(chalk.red.bold(figlet.textSync('EMPLOYEE TRACKER')));
console.log(``);
console.log(`                               ` + chalk.green.bold('Made with ❤️️ by Imran Rasi'));
console.log(``);
console.log(chalk.yellow.bold(`======================================================================================================`));


// this is the function 
// to start our application

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "begin",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add Department", "Add Role", "Add Employee", "Update Employee Roles", "Exit"]
        }
    
    // When you select one of the above options
    // then the answer will appear
     
    ]).then(answer => {

        switch (answer.begin) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                newEmployeeName();
                break;
            case "Update Employee Roles":
                updateEmployeeRole();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
};
