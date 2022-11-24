

// importing the files
// from the current folders

const util = require("util");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  // Username

  user: "root",

  // Passwor

  password: "hi786123",
  database: "employer_trackerDB"
});
connection.connect();

// this function is used for using
// the promises instead of using callbacks

connection.query = util.promisify(connection.query);
module.exports = connection;