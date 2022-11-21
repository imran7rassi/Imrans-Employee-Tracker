

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


