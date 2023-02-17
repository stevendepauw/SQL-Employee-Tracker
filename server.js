//Dependencies 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const tableFormat = require('console.table');

//creating database connection
const db = mysql.createConnection({
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


//Start menu displayed when the program start
const startMenu = async () => {
  const result = await inquirer
    .prompt({
      type: 'list',
      name: 'startMenuSelection',
      message: 'What would you like to do?',
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee's role",
        "Exit"
      ]
    })
    .then((result) => {
      switch (result.startMenuSelection) {
        case 'View all Departments':
          viewDepartments();
          break;

        case 'View all Roles':
          viewRoles();
          break;

        case 'View all Employees':
          viewEmployees();
          break;

        case 'Add a Department':
          addDepartment();
          break;

        case 'Add a Role':
          addRole();
          break;

        case 'Add an Employee':
          addEmployee();
          break;

        case "Update an Employee's role":
          updateEmployee();
          break;

        case 'Exit':
          quit();
          break;

        default:
          quit();
      }
    })
}


//Functions that handle the start menu options
const viewDepartments = () => {
  const sql = 'SELECT * FROM department';
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startMenu();
  })
}

const viewRoles = () => {
  const sql = 'SELECT * FROM role';
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startMenu();
  })
}

const viewEmployees = () => {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startMenu();
  })
}

const addDepartment = async () => {
  const result = await inquirer
    .prompt({
      type: 'input',
      name: 'depName',
      message: 'What department would you like to add?'
    })
    .then((result) => {
      db.query('INSERT INTO department (name) Values (?)', [result.depName], (err, res) => {
        if (err) throw err;
        console.table(res);
        startMenu();
      });
    });

  startMenu();
}

const addRole = async () => {
  const result = await inquirer
    .prompt([
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
    ])
    .then((result) => {
      db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [result.title, result.salary, result.department], (err, res) => {
        if (err) throw err;
        console.table(res);
      });
    });
  startMenu();
}

const addEmployee = async () => {
  const result = await inquirer
    .prompt([
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
    ])
    .then((result) => {
      db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [result.first_name, result.last_name, result.role_id, result.mnager_id], (err, res) => {
        if (err) throw err;
        console.table(res);
      });
    })
  startMenu();
}

const updateEmployee = async (employeeId) => {
  const result = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: 'Which employee would you like to update? Please enter the employee id number'
      },
      {
        tpye: 'input',
        name: 'role_id',
        message: 'What new role would you like for your employee? Enter the number of the "id" of the desired new role'
      }
    ])
    .then((result) => {
      db.query('UPDATE employee SET role_id = ? WHERE id = ?', [result.role_id, result.employee_id], (err, res) => {
        console.table(res);
      });
    })
  startMenu();
}

const quit = () => {
  db.end();
  process.exit();
}