const inquirer = require('inquirer');
const add = require("./add")
const view = require("./view")
const update = require("./update")

function run() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department, role, or employee",
        "View departments, roles, or employees",
        "Update employee roles"
      ]
    })
  .then(function (answer) {
    switch (answer.action) {
      case "Add department, role, or employee":
        add();
        break;

      case "View departments, roles, or employees":
        view();
        break;

      case "Update employee roles":
        update();
        break;
    }
  });
}

module.exports = run