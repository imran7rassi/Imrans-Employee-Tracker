
-- Droping the employee tracker database if
-- it's already exist

DROP DATABASE IF EXISTS employer_trackerDB;
-- we create a database by name of
-- employee tracker
CREATE database employer_trackerDB;

-- use the database --
USE employer_trackerDB;

-- Create the table for department --
CREATE TABLE department (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(30) UNIQUE NOT NULL
);

-- create the table for roles --
CREATE TABLE role (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  departmentId INT UNSIGNED NOT NULL,
  FOREIGN KEY (departmentId) REFERENCES departments(id)
);

-- Create the table for employee --

CREATE TABLE employee (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  roleId INT UNSIGNED NOT NULL,
  managerId INT UNSIGNED,
  FOREIGN KEY(roleId) REFERENCES roles(id),
  FOREIGN KEY(managerId) REFERENCES employees(id)
);