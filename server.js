const inquirer = require('inquirer');
const cTable = require('console.table');
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
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'Add department, role, or employee',
        'View departments, roles, or employees',
        'Update employee roles',
        'Exit'
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case 'Add department, role, or employee':
          add()
          break

        case 'View departments, roles, or employees':
          view()
          break

        case 'Update employee roles':
          update()
          break

        case 'Exit':
          connection.end()
          break
      }
    });
}


// ***** ADD FUNCTIONS ******

function add() {
  inquirer
    .prompt({
      name: 'add_options',
      type: 'rawlist',
      message: 'What would you like to add?',
      choices: [
        'Add department',
        'Add role',
        'Add employee',
        'Exit'
      ]
    })
    .then((answer) => {
      switch (answer.add_options) {
        case 'Add department':
          addDept();
          break;

        case 'Add role':
          addRole();
          break;

        case 'Add employee':
          addEmp();
          break;
        
        case 'Exit':
          run();
          break;
      }
    })
}
// **** add department function **** 

function addDept() {
  inquirer
    .prompt({
      name: 'add_dept',
      type: 'input',
      message: 'What department would you like to add?'
    })
    .then((answer) => {
      console.log(answer);
      let query = 'INSERT INTO department (name) VALUES (?)';
      connection.query(query, answer.add_dept, (err, res) => {
        if (err) throw err
        console.log('added!')
        console.log(res);
        run()
      })
    })
}

// **** add role function **** 

function addRole() {

  connection.query('SELECT id as value, name FROM department', (err, departments) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What role would you like to add?'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the salary for this role?'
        },
        {
          name: 'department_id',
          type: 'rawlist',
          message: "In what department is this role housed? If the option is not avialable below, choose 'Exit' and add the department first.",
          choices: [...departments, { name: "Exit", value: "Exit" }]
        }
      ])
      .then((answers) => {
        if(answers.department_id === "Exit")
          return run()

        const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)'
        // const data = Object.values(answers);

        connection.query(query, [answers.title, answers.salary, answers.department_id], (err, res) => {
          if (err) throw err
          console.log('Added!')
          run()
        })
      })
  })
}

// **** add role function **** 
function addEmp() {
  console.log("Sorry, this option doesn't exist yet - check back later!");
  // connection.query('SELECT id as value, name FROM roles', (err, roles))
  // inquirer
  //   .prompt([
  //     {
  //       name: 'add_emp_first',
  //       type: 'input',
  //       message: "What is the employee's first name?"
  //     },
  //     {
  //       name: 'add_emp_last',
  //       type: 'input',
  //       message: "What is the employee's last name?"
  //     },
  //     {
  //       name: 'add_emp_role',
  //       type: 'input',
  //       message: "What is the employee's role?"
  //     },
  //     {
  //       name: 'add_emp_dept',
  //       type: 'input',
  //       message: "What is the employee's department?"
  //     }
  //   ])
  //   .then((roles) => {
  //     let query = 'INSERT INTO employee (first_name, last_name, role_id, department_id) VALUES (?)'
  //     for (i = 0; i < answers.length; i++) {
  //       console.log(answers[i])
  //       connection.query(query, [answers.add_emp_first, answers.add_emp_last, answers.add_emp_role, answers.add_emp_dept], (err, res) => {
  //         if (err) throw err
  //         console.log('added!')
  //         console.log(res)
  //         run()
  //       })
  //     }
  //   })
}

// ********* VIEW FUNCTION ***********

function view() {

  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'Which dataset would you like to view?',
      choices: [
        'Departments',
        'Roles',
        'Employees'
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case 'Departments':
          connection.query('SELECT * FROM department', (err, res) => {
            if (err) throw err
            console.table(res)
            run()
          })
          break

        case 'Roles':
          connection.query('SELECT * FROM roles', (err, res) => {
            if (err) throw err
            console.table(res)
            run()
          })
          break

        case 'Employees':
          connection.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err
            console.table(res)
            run()
          })
          break
      }
    }
    );
}

// ******** UPDATE FUNCTION ************

function update() {
  inquirer
  .prompt({
    name: 'action',
    type: 'rawlist',
    message: 'What do you want to update?',
    choices: [
      'Departments',
      'Roles',
      'Employees'
    ]
  })
  .then(function (answer) {
    switch (answer.action) {
      case 'Departments':
        updateDept()
        break

      case 'Roles':
        updateRole()
        break

      case 'Employees':
        updateEmp()
        break
    }
  })
}

// ******** update department function ***********

function updateDept() {
  console.log("Sorry, this option doesn't exist yet - check back later!");

}

// ******** update roles function ***********

function updateRole() {
  console.log("Sorry, this option doesn't exist yet - check back later!");
}

// ******* update employees function ********

function updateEmp() {
  console.log("Sorry, this option doesn't exist yet - check back later!");
}

