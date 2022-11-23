

// requires the data
// from current places //

const inquirer = require("inquirer");
const mysql = require("mysql2");
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
    database: "employeeTracker"
});

// This is the initiating 
// for mysql connection

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  afterConnection();
});

// this function is use to validate
// the first and last name in CLI

// Welcome image for the users //
afterConnection = () => {
console.log(chalk.green.bold('======================================================================================================='));
console.log(``);
console.log(chalk.white.bold(figlet.textSync('EMPLOYEE TRACKER')));
console.log(``);
console.log(`                               ` + chalk.blue.bold('Made with ❤️️ by Imran Rasi'));
console.log(``);
console.log(chalk.green.bold(`======================================================================================================`));
 promptuser();
};

// this is the function 
// to start our application

function promptuser() {
    inquirer.prompt([
        {
          type: "list",
          name: "choices",
          message: "What would you like to do?",
          choices: [
            'View All Employees',
            'View All Roles',
            'View All Departments',
            'View Employees By Manager',
            'Update Employee Role',
            'Add New Employee',
            'Add New Role',
            'Add New Department',
            chalk.green('Delete an employee'),
            chalk.green('Delete a role'),
            chalk.green('Delete a department'),
            chalk.green('View department budgets'),
            'Exit Menu',
        ],

        }
        
    // When you select one of the above options
    // then the answer will appear
      ]).then((answers) => {
      const { choices } = answers; 

      if (choices === 'View All Employees') {
        showEmployees();
    }

    if (choices === 'View All Roles') {
        showRoles();
    }

    if (choices === 'View All Departments') {
        showDepartments();
    }

    if (choices === 'View Employees By Manager') {
      showEmployeesByManager();
    }

    if (choices === "Add New department") {
      addDepartment();
    }

    if (choices === "Add New Role") {
      addRole();
    }

    if (choices === "Add New Employee") {
      addEmployee();
    }

    if (choices === "Update Employee Role") {
      updateEmployee();
    }

    if (choices === "Update Employee Managers") {
      updateManager();
    }

    if (choices === "View employees by department") {
      employeeDepartment();
    }

    if (choices === "Delete a department") {
      deleteDepartment();
    }

    if (choices === "Delete a role") {
      deleteRole();
    }

    if (choices === "Delete an employee") {
      deleteEmployee();
    }

    if (choices === "View department budgets") {
      viewBudget();
    }

    if (choices === 'Exit Menu') {
        connection.end();
    }

});
      };


// this is the function that 
// shows all the department that
// stored in the database

showDepartments = () => {
  console.log('Showing all departments...\n');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`; 

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptuser();
  });
};

// this is the function that 
// shows all the Roles that 
// stored in the database

showRoles = () => {
  console.log('Showing all roles...\n');

  const sql = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;
  
  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows); 
    promptuser();
  })
};

// this is the function to show all the 
// employees with their first name
// last name, salary .....

showEmployees = () => {
  console.log('Showing all employees...\n'); 
  const sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name AS department,
                      role.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows);
    promptuser();
  });
};


// BONUS: SQL ORDER BY statement to view employees by manager
const showEmployeesByManager = () => {
  const query = 'SELECT * FROM employee ORDER BY manager_id DESC';
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
  })

  start();
}

// we use this function 
// when we want to add a department
// we enter a department and if it's
// empty so throw an err

addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'addDept',
      message: "What department do you want to add?",
      validate: addDept => {
        if (addDept) {
            return true;
        } else {
            console.log('Please enter a department');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;
      connection.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.addDept + " to departments!"); 

        showDepartments();
    });
  });
};

// this is the function to
// add the role for employee
// if there is no role inputed
// sp throw an err

addRole = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'role',
      message: "What role do you want to add?",
      validate: addRole => {
        if (addRole) {
            return true;
        } else {
            console.log('Please enter a role');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary of this role?",
      validate: addSalary => {
        if (isNAN(addSalary)) {
            return true;
        } else {
            console.log('Please enter a salary');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.role, answer.salary];

      // grab dept from department table
      const roleSql = `SELECT name, id FROM department`; 

      connection.promise().query(roleSql, (err, data) => {
        if (err) throw err; 
    
        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
        {
          type: 'list', 
          name: 'dept',
          message: "What department is this role in?",
          choices: dept
        }
        ])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log('Added' + answer.role + " to roles!"); 

              showRoles();
       });
     });
   });
 });
};
