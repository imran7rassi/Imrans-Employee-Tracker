

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
    database: "employer_trackerDB"
});

// This is the initiating 
// for mysql connection
connection.connect(function (err) {
  if (err) throw err;
  mainMenu();
});

// this function is use to validate
// the first and last name in CLI

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

function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Exit"
      ]
    })

    // When you select one of the above options
    // then the answer will appear

    .then(function (answer) {
      switch (answer.mainMenu) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Departments":
          viewAllDept();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
          addDept();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

// this is the function to show all the 
// employees with their first name
// last name, salary ....

function viewAllEmployees() {
  var query = "SELECT * FROM employee"
  connection.query(query, function (err, res) {
    const table = cTable.getTable(res);
    console.log(table);
    mainMenu();
  });
}

// this is the function that 
// shows all the department that
// stored in the database
function viewAllDept() {
  var query = "SELECT * FROM department "
  connection.query(query, function (err, res) {
    const table = cTable.getTable(res);
    console.log(table);
    mainMenu();
  });
}

// this is the function that 
// shows all the Roles that 
// stored in the database

function viewAllRoles() {
  var query = "SELECT * FROM role"
  connection.query(query, function (err, res) {
    const table = cTable.getTable(res);
    console.log(table);
    mainMenu();
  });
}


// this is the function for adding
// the employee by it's firstname
// lastname 
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Enter the employee's last name",
        name: "lastName"
      },
      {
        type: "input",
        message: "Enter the employee's role ID",
        name: "addEmployRole"
      },
      {
        type: "input",
        message: "Enter the employee's manager ID",
        name: "addEmployMan"
      }
    ])

    .then(function (res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const employRoleID = res.addEmployRole;
      const employManID = res.addEmployMan;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employRoleID}", "${employManID}")`;
      connection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        const table = cTable.getTable(res);
        console.log(table);
        mainMenu();
      });
    });
}


// we use this function 
// when we want to add a department
// we enter a department and if it's
// empty so throw an err

function addDept() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter the name of the new department",
      name: "newDept"
    })
    .then(function (res) {
      const newDepartment = res.newDept;
      const query = `INSERT INTO department (department_name) VALUES ("${newDepartment}")`;
      connection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        const table = cTable.getTable(res);
        console.log(table);
        mainMenu();
      });
    });
}


// this is the function to
// add the role for employee
// if there is no role inputed
// so throw an err
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's title",
        name: "roleTitle"
      },
      {
        type: "input",
        message: "Enter the employee's salary",
        name: "roleSalary"
      },
      {
        type: "input",
        message: "Enter the employee's department ID",
        name: "roleDept"
      }
    ])
    .then(function (res) {
      const title = res.roleTitle;
      const salary = res.roleSalary;
      const departmentID = res.roleDept;
      const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
      connection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        const table = cTable.getTable(res);
        console.log(table);
        mainMenu();
      });
    });
}

// this is the function to update 
// the role

function updateEmployeeRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's ID you want to be updated",
        name: "updateEmploy"
      },
      {
        type: "input",
        message: "Enter the new role ID for that employee",
        name: "newRole"
      }
    ])
    .then(function (res) {
        const updateEmploy = res.updateEmploy;
        const newRole = res.newRole;
        const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;
        connection.query(queryUpdate, function (err, res) {
          if (err) {
            throw err;
          }
          const table = cTable.getTable(res);
          console.log(table);
          mainMenu();
        })
      });
    }

