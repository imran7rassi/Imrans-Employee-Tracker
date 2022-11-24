
-- inserting the name of departments -

INSERT INTO department (name)
VALUES ("engineering"),
    ("finance"),
    ("marketing"),
    ("sales");

SELECT * FROM DEPARTMENT;

-- Creating the rows 
-- in the role tablt --

INSERT INTO role (title, salary, departmentId)
VALUES ("software engineer", 120000, 1),
    ("project manager", 90000, 1),
    ("engineering manager", 225000, 1),
    ("accountant", 70000, 2),
    ("accounting manager", 120000, 2),
    ("product marketing manager", 50000, 3),
    ("marketing lead", 150000, 3),
    ("sales rep", 85000, 4);

SELECT * FROM ROLE;

-- Creating the rows
-- in the employee table --
INSERT INTO employee (firstName, lastName, roleId, managerId)
VALUES ("Alex", "Aria", 3, NULL),
    ("Tom", "Brus", 3, 1),
    ("Ali", "Max", 1, 2),
    ("Mickey", "Brown", 1, 2),
    ("Indiana", "Gree", 2, 1);

SELECT * FROM employee;