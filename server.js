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
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee's role"
    ]
  }
]

const newDepartment = [
    {
      type: 'input',
      name: 'name',
      message: 'What department would you like to add?'
    }
]

const newRole = [
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the new role? (Please enter numbers only)'
    },
    {
      type: 'input',
      name: 'department',
      message: 'What department is the new role in? Enter only the number for the "id" of the department.'
    }
]

const newEmployee = [
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the new employee?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the new employee?'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Please enter the number of the employees role',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Who is the manager for the new employee? Enter the number of the "id" for the manager'
    }
  ]

  const selectEmployee = [
    {
      type: 'input',
      name: 'employee_id',
      message: 'Which employee would you like to update? Please enter the employee id number'
    }
  ]

  const updateRole = [
    {
      tpye: 'input',
      name: 'role_id',
      message: 'What new role would you like for your employee? Enter the number of the "id" of the desired new role'
    }
  ]

  const addDepartment = async() => {
    const result = await inquirer.prompt(newDepartment)
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [result.name];

    db.query(sql, params, (err, results) => {
      console.log('Update complete');
      console.table(results);
    });
    startMenu();
  }

  const addRole = async() => {
    const result = await inquirer.promp(newRole)
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [result.title, result.salary, result.department];

    db.query(sql, params, (err, results) => {
      console.log('Update complete');
      console.table(results);
    });
    startMenu();
  }

  const addEmployee = async() => {
    const result = await inquirer.prompt(newEmployee)
    const sql = `INSERT INTO emplyee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [result.first_name, result.last_name, result.role_id, result.mnager_id];
    
    db.query(sql, params, (err, results) => {
      console.log('Update Complete');
      console.table(results);
    });

    update
  }

//What the user will see after logging in
startMenu () => {
    inquirer.prompt([

    ]);
};