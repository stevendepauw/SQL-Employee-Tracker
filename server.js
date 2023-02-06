//Dependencies to require
const inquirer = require('inquirer');
const mysql = require('mysql2');
const tableFormat = require('console.table');

//creating database connection
const db = mysql.createConnection( {
    host: 'localhost',
    user: 'root', 
    password: 'password',
    database: 'employees_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log(`Connected to the employees_db database.`)
    console.log(`Select an option from below to get started`);

    startMenu();
});

//arrays for the different prompt questions
const startMenuMain = [
    {
        type: 'list',
        name: 'startMenuQuestion',
        message: 'What would you like to do?',
        choices: [
            "Show all Roles",
            "Add a Role",
            "Show all Departments",
            "Add a Department",
            "Show all Employees",
            "Add an Employee",
            "Update an Employee's role"
    ]
  }
]

//What the user will see after logging in
startMenu () => {
    inquirer.prompt([

    ]);
};