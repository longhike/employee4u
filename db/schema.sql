DROP DATABASE IF EXISTS ems_db;
CREATE database ems_db;

USE ems_db;

CREATE TABLE department (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id int NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id int NULL,
    manager_id int NULL,
    PRIMARY KEY (id)
);


-- code section I can use in the server.js 
INSERT INTO roles (department_id) SELECT id FROM department;
INSERT INTO employee (role_id) SELECT id FROM roles;
INSERT INTO employee (manager_id) SELECT id FROM department;
