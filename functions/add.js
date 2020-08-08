const inquirer = require('inquirer');

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
            
        })
    
}

module.exports = add