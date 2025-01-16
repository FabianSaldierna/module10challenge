// importing classes from other files
import inquirer from "inquirer";
import queries from './queries.js';
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20;

class Cli {

    async addDepartment() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'dept',
                message: 'What is the name of the department?',
            },
        ]);
        if (answers.dept != null) {
            queries.addDbDepartment(answers.dept);
        } else {
            this.addDepartment();
        }
    }

    async addRole() {
        const departments = await queries.getDepartments();
        //change the object into an array with just the values of name
        const opciones = departments.map(a => a.name);
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'dept',
                message: 'Which department does the role belong to?',
                choices: opciones,
            },
        ]);
        if (answers.roleName != null || answers.salary != null || !(isNaN(answers.salary))) {
            queries.addDbRole(answers.roleName, answers.salary, answers.dept);
        } else {
            this.addRole();
        }
    }

    async addEmployee() {
        const roles = await queries.getRoles();
        const opcionesRoles = roles.map(b => b.title);

        const managers = await queries.getManagers();
        const opcionesManager = managers.map(a => a.concat);
        const opcionesManagerdepurado = opcionesManager.filter(a => a !== ' ');
        opcionesManagerdepurado.push('None');
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: `What is the employee's first name?`,
            },
            {
                type: 'input',
                name: 'lastName',
                message: `What is the employee's last name?`,
            },
            {
                type: 'list',
                name: 'role',
                message: `What is the employee's role?`,
                choices: opcionesRoles,
            },
            {
                type: 'list',
                name: 'manager',
                message: `Who is the employee's manager?`,
                choices: opcionesManagerdepurado,
            },
        ]);
        if (answers.firstName != null || answers.lastName != null || answers.manager != null ) {
            queries.addDbEmployee(answers.firstName, answers.lastName, answers.role, answers.manager);
        } else {
            this.addEmployee();
        }

    }

    async updateEmployee() {
        const empleados = await queries.getEmpleados();
        const opcionesEmpleados = empleados.map(a => a.concat);

        const roles = await queries.getRoles();
        const opcionesRoles = roles.map(b => b.title);

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'empleado',
                message: `Which employee's role do you want to update?`,
                choices: opcionesEmpleados,
            },  
            {
                type: 'list',
                name: 'rol',
                message: `Which role do you want to assign to the selected employee?`,
                choices: opcionesRoles,
            },  
        ]);
        if (answers.empleado != null || answers.rol != null ) {
            queries.updateDbEmployee(answers.empleado, answers.rol);
        } else {
            this.updateEmployee();
        }
    }


    async startCli() {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role',
                    'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'],
            },
        ]);
        // Handle the selected option
        if (answers.action === 'View All Employees') {
            queries.viewAllEmployees();
        }
        if (answers.action === 'View All Roles') {
            queries.viewAllRoles();
        }
        if (answers.action === 'View All Departments') {
            queries.viewAllDepartments();
        }
        if (answers.action === 'Add Department') {
            await this.addDepartment();
        }
        if (answers.action === 'Add Role') {
            await this.addRole();
        }
        if (answers.action === 'Add Employee') {
            await this.addEmployee();
        }
        if (answers.action === 'Update Employee Role') {
            await this.updateEmployee();
        }
        if (answers.action === 'Exit') {
            process.exit();
        }
        this.startCli();
    }
};

// export the Cli class
export default Cli;

    
    