
-- inserting the name of departments --

INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Finance"),
    ("Marketing"),
    ("Engineering")

-- Creating the rows 
-- in the role tablt --

INSERT INTO role (title, salary, department_id)
VALUES

("Sales Manager", "150000.00", 1),
("Salesperson", "75000.00", 1),
("Account Manager", "145000.00", 2),
("Accountant", "133000.00", 2);
("Marketing lead", "220000.00", 3),
("Product Marketing Manager", "175000.00", 3),
("Engineer Lead Manager", "165000.00", 4),
("Software Engineer", "130000.00", 4),

-- Creating the rows
-- in the employee table --

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES

("Ali", "DJ", 1, NULL),
("Micheal", "CJ", 2, 1),
("Frank", "Adams", 2, 1),
("Maria", "Rodriguez", 3, NULL),
("Killy", "Dobsom", 4, 4),
("Messi", "Octa", 4, 4),
("Tylor", "Ale", 5, NULL),
("Robin", "Bauer", 6, 7),
("Salim", "India", 6, 7),

-- Selects all columns from
-- each table in database --

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;