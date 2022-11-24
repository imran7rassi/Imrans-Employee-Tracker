
// requires the data
// from current places //
// require the console.table //

const mysql = require('mysql2')
const inquirer = require('inquirer')
// terminal string styling
const chalk = require('chalk');
// implement FIGfont spec in Javascript
const figlet = require('figlet');

// require the console.table //
require('console.table')

// importing the connection.js file
// from the db folder to connect the mysql
// with the server.js

const db = require('./db/connection')
const connection = require('./db/connection')

// Welcome image for the users //
console.log(chalk.green.bold('======================================================================================================='));
console.log(``);
console.log(chalk.white.bold(figlet.textSync('EMPLOYEE TRACKER')));
console.log(``);
console.log(`                               ` + chalk.blue.bold('Made with ❤️️ by Imran Rasi'));
console.log(``);
console.log(chalk.green.bold(`======================================================================================================`));

// adding the start function to 
// run our app
start()

// this is the function 
// to start our application
// and propmt as what we want to do
// select from the options

function start() {
  inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a new department",
        "Add a new role",
        "Add a new employee",
        "Remove a department",
        "Remove a role",
        "Remove an employee",
        "Update employee roles",
        "Exit"
      ]
    }])

    // When you select one of the above options
    // then the answer will appear

    .then(function (answer) {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "Remove a department":
          removeDepartment();
          break;

        case "Remove a role":
          removeRole();
          break;
        case "Remove an employee":
          removeEmployee();
          break;
        case "Update employee roles":
          updateEmpRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
};


// this is the function that 
// shows all the department that
// stored in the database

function viewDepartments() {
  db.query('SELECT * FROM DEPARTMENT', function (err, res) {
    if (err) throw err;
    console.table(res)
    start()
  })
}

// this is the function that 
// shows all the Roles that 
// stored in the database

function viewRoles() {
  db.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
    console.table(res)
    start()
  })
}

// this is the function to show all the 
// employees with their first name
// last name, salary ....
function viewEmployees() {
  db.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;
    console.table(res)
    start()
  })
}


// we use this function 
// when we want to add a department
// we enter a department and if it's
// empty so throw an err

function addDepartment() {
  inquirer.prompt([
    {
      name: 'addDepartment',
      message: 'Name of Department you wish to add:'
    }
  ]).then(function (answer) {
    db.query('INSERT INTO department SET ?', {
      name: answer.addDepartment
    }, function (err, res) {
      if (err) throw err;
      console.table(res)
      start()
    })
  }
  )
}

// this is the function to
// add the role for employee
// if there is no role inputed
// so throw an err

const addRole = () => {
  db.query('SELECT * FROM DEPARTMENT', (err, department) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Name of role you wish to add:'
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Salary for role:'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Department ID:',
        choices: department.map(department => ({
          name: `${department.name}`,
          value: department.id
        }))
      }
    ]).then(function (answers) {
      db.query('INSERT INTO roles SET ?', {
        title: answers.title,
        salary: answers.salary,
        departmentId: answers.departmentId
      }, function (err, res) {
        if (err) throw err;
        console.table(res)
        start()
      })
    })
  })
}

// this is the function for adding
// the employee by it's firstname
// lastname 

const addEmployee = () => {
  db.query('SELECT * FROM role', (err, roles) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'First Name:'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Last Name:'
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Role ID:',
        choices: roles.map(role => ({
          name: `${role.title}`,
          value: role.id
        }))
      }

    ]).then(function (answers) {
      db.query('INSERT INTO employee SET ?', {
        firstName: answers.firstName,
        lastName: answers.lastName,
        roleId: answers.roleId,

        //managerId null
        managerId: null
      }, function (err, res) {
        if (err) throw err;
        console.table(res)
        start()
      })
    })
  })
}


// this is the function to 
// remove the department 
// from the database

function removeDepartment() {
  db.query('SELECT * FROM DEPARTMENT', (err, departments) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: "list",
        name: "removeDep",
        message: "Select the department which will be removed",
        choices: departments.map(department => ({
          name: `${department.name}`,
          value: department.id
        }))
      }
    ]).then(function (answer) {
      db.query(`DELETE FROM department WHERE id = ${answer.removeDep}`
        , function (err, res) {
          if (err) throw err
          console.log('Department removed!')
          start()
        })
    })
  })
}

// this is the function to 
// remove a role from the
// database that we have

function removeRole() {
  db.query('SELECT * FROM role', (err, roles) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: "list",
        name: "removeRole",
        message: "Select the role which will be removed",
        choices: roles.map(role => ({
          name: `${role.title}`,
          value: role.id
        }))
      }
    ]).then(function (answer) {
      db.query(`DELETE FROM role WHERE id = ${answer.removeRole}`
        , function (err, res) {
          if (err) throw err
          console.log('Role removed!')
          start()
        })
    })
  })
}

// this is the function
// to remove an employee 
// from the department 

function removeEmployee() {
  db.query('SELECT * FROM employee', (err, employees) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: "list",
        name: "removeEmp",
        message: "Select the employee which will be removed",
        choices: employees.map(employee => ({
          name: `${employee.firstName} ${employee.lastName}`,
          value: employee.id
        }))
      }
    ]).then(function (answer) {
      db.query(`DELETE FROM employee WHERE id = ${answer.removeEmp}`
        , function (err, res) {
          if (err) throw err
          console.log('Employee removed!')
          start()
        })
    })
  })
}


// this is the function 
// to update the Employee 
// Role from the database

function updateEmpRole() {

  db.query('SELECT * FROM employee', (err, employees) => {
    if (err) { console.log(err) }
    db.query(`SELECT * FROM roles`, (err, roles) => {
      if (err) { console.log(err) }
      inquirer.prompt([
        {
          type: "list",
          name: "selectEmp",
          message: "Select the employee who's role will be updated",
          choices: employees.map(employee => ({
            name: `${employee.firstName} ${employee.lastName} - Role ID:${employee.roleId}`,
            value: employee.id
          }))
        },
        {
          type: 'list',
          name: 'updatedRole',
          message: 'New Role ID:',
          choices: roles.map(role => ({
            name: `${role.title}`,
            value: role.id
          }))
        }
      ]).then(function (answers) {
        db.query('UPDATE employees SET ? WHERE ?', [{ roleId: answers.updatedRole }, { id: answers.selectEmp }], function (err, res) {
          if (err) throw err
          console.log('Employee role updated!')
          start()
        })
      })
    })
  })
}