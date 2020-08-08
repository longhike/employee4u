const inquirer = require('inquirer');
const cons_tab = require('console.table');
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'ems_db',
});


connection.connect((err) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId);
    run()
});

// ************ FUNCTIONS *******************

// **** RUN FUNCTION *******

function run() {
    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department, role, or employee",
        "View departments, roles, or employees",
        "Update employee roles",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add department, role, or employee":
        add()
        break
    
      case "View departments, roles, or employees":
        view()
        break
    
      case "Update employee roles":
        update()
        break
    
      case "Exit":
        connection.end()
        break
      }
    });
}


// ***** ADD FUNCTIONS ******

function add() {
    inquirer
        .prompt({
            name: "add_options",
            type: "rawlist",
            message: "What would you like to add?",
            choices: [
                "Add department",
                "Add role",
                "Add employee"
            ]
        })
        .then((answer) => {
            switch (answer.add_options) {
                case "Add department":
                  addDept();
                  break;
              
                case "Add role":
                  addRole();
                  break;
              
                case "Add employee":
                  addEmp();
                  break;
                }
        })
    
}
// **** add department function **** 

function addDept() {
    inquirer
    .prompt({
        name: "add_dept",
        type: "input",
        message: "What department would you like to add?"
    })
    .then((answer) => {
        console.log(answer);
        let query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, answer.add_dept, (err, res) => {
            if (err) throw err
            console.log("added!")
            console.log(res);
        })
    })
}

// **** add role function **** 

function addRole() {
    inquirer
    .prompt(
    {
        name: "add_role_name",
        type: "input",
        message: "What role would you like to add?"
    },
    {
        name: "add_role_salary",
        type: "input",
        message: "What is the salary for this role?"
    },
    {
        name: "add_role_department",
        type: "input",
        message: "In what role is this department housed?"
    })
    .then((answer) => {
        console.log(answer);
    })
}


// ********* VIEW FUNCTION ***********

function view() {
    
}

// ******** UPDATE FUNCTION ************

function update() {
    
}

