

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

console.log(chalk.green.bold('======================================================================================================='));
console.log(``);
console.log(chalk.white.bold(figlet.textSync('EMPLOYEE TRACKER')));
console.log(``);
console.log(`                               ` + chalk.blue.bold('Made with ❤️️ by Imran Rasi'));
console.log(``);
console.log(chalk.green.bold(`======================================================================================================`));


// this is the function 
// to start our application

function start() {
    inquirer.prompt([
        {
          type: "list",
          name: "begin",
          message: "What would you like to do?",
          choices: ["View all employees", "View all roles", "View all departments", "add an employee", "add a role", "add a department", "update role for an employee", "update employee's manager", "view employees by manager", "delete a department", "delete a role", "delete an employee", "View the total utilized budget of a department", "quit"]
        }
        
    // When you select one of the above options
    // then the answer will appear
    ]).then(answer => {

          switch (answer.begin) {
            case "View all employees":
              viewAll("EMPLOYEE");
              break;
            case "View all roles":
              viewAll("ROLE");
              break;
            case "View all departments":
              viewAll("DEPARTMENT");
              break;
            case "add a department":
              addNewDepartment();
              break;
            case "add a role":
              addNewRole();
              break;
            case "add an employee":
              addNewEmployee();
              break;
            case "update role for an employee":
              updateRole();
              break;
            case "view employees by manager":
              viewEmployeeByManager();
              break;
            case "update employee's manager":
              updateManager();
              break;
            case "delete a department":
              deleteDepartment();
              break;
            case "delete a role":
              deleteRole();
              break;
            case "delete an employee":
              deleteEmployee();
              break;
            case "View the total utilized budget of a department":
              viewBudget();
              break;
            default:
              connection.end();
          }
        })

        .catch(err => {
          console.error(err);
        });
      };


// this is the function to show all the 
// employees with their first name
// last name, salary .....

function viewAllEmployees() {

    var query = "SELECT CONCAT(a.first_name, ' ', a.last_name) AS 'employee name', title, salary, name AS department, ";

    query += "CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employee a LEFT JOIN employee b ON a.manager_id = b.id ";
    query += "INNER JOIN role ON a.role_id = role.id INNER JOIN department ON department_id = department.id"
    connection.query(query, (err, res) => {

        if (err) throw err;
        console.log("\n-----------------------------------");
        const table = cTable.getTable(res);
        console.log(table);
        start();
    });
};


// this is the function that 
// shows all the department that
// stored in the database

function viewAllDepartments() {
    var query = "SELECT * FROM department ORDER BY id";
    connection.query(query, (err, res) => {

        if (err) throw err;
        console.log("\n-----------------------------------");
        const table = cTable.getTable(res);
        console.log(table);

        start();
    });
};


// this is the function that 
// shows all the Roles that 
// stored in the database

function viewAllRoles() {
    var query = "SELECT title, salary, name AS department FROM role INNER JOIN department ON role.department_id = department.id";

    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("\n-----------------------------------");
        const table = cTable.getTable(res);
        console.log(table);

        start();
    });
};

