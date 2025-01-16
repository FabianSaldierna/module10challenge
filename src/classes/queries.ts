import { QueryResult } from 'pg';
import { pool } from './connections.js';

class queries {

    private static renglones() {
        for (let i = 0; i <= 8; i++) {
            console.log(` `);

        }
    };

    static async viewAllEmployees() {
        pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(m.first_name, ' ', m.last_name) as manager_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id LEFT JOIN employee m ON m.id = employee.manager_id ORDER BY employee.id`, (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else if (result) {
                console.log(` `);
                console.table(result.rows);
                this.renglones();
            }
        });
    };

    static async viewAllRoles() {
        pool.query('SELECT role.id, role.title, role.salary, department.name as department_name FROM role JOIN department ON role.department_id = department.id', (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else if (result) {
                console.log(` `);
                console.table(result.rows);
             this.renglones();
            }
        });
    };

    static async viewAllDepartments() {
        pool.query('SELECT * FROM department', (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else if (result) {
                console.log(` `);
                console.table(result.rows);
            this.renglones();
            }
        });
    };

    static async addDbDepartment(dept: string) {
        pool.query(`INSERT INTO department (name) VALUES ('${dept}')`, (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else if (result) {
                console.log(`ADDED DEPARTMENT TO THE DB`);
            }
        });
    };

    static async addDbRole(title: string, salary: number, dept: string) {
        //get the id for the selected department
        const dept_id = await this.getDepartmentsID(dept);
        pool.query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', '${dept_id[0].id}')`, (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else if (result) {
                console.log(`ADDED ROLE TO THE DB`);
            }
        });
    };

    static async addDbEmployee(first_name: string, last_name: string, role: string, manager: string) {
        //get the id for the selected department
        const role_id = await this.getRolesID(role);
        let manager_id;
        if (manager == 'None') {
            pool.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${first_name}', '${last_name}', '${role_id[0].id}')`, (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    console.log(`ADDED ROLE TO THE DB`);
                }
            });

        } else {
            manager_id = await this.getManagersID(manager);
            pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${role_id[0].id}', '${manager_id[0].id}')`, (err: Error, result: QueryResult) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    console.log(`ADDED ROLE TO THE DB`);
                }
            });
        }
    };

    static async updateDbEmployee(empleado: string, role: string) {
        const role_id = await this.getRolesID(role);
        const employee_id = await this.getEmployeeID(empleado);
        pool.query(`UPDATE employee SET role_id = '${role_id[0].id}' WHERE id = '${employee_id[0].id}'`, (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else if (result) {
                console.log(`MODIFIED ROLE FOR THE EMPLOYEE`);
            }
        });

    }

    static async getDepartments() {
        var result = await pool.query('SELECT name FROM department');
                return result.rows;
        }

    static async getRoles() {
        var result = await pool.query('SELECT title FROM role');
        return result.rows;
    }

    static async getEmpleados() {
        var result = await pool.query(`SELECT CONCAT (employee.first_name, ' ', employee.last_name) FROM employee`);
        return result.rows;
    }
    static async getManagers() {
        var result = await pool.query(`SELECT CONCAT(m.first_name, ' ', m.last_name) FROM employee LEFT JOIN employee m ON m.id = employee.manager_id`);
        return result.rows;
    }

    static async getDepartmentsID(dept: string) {
        var result = await pool.query(`SELECT id FROM department WHERE name = '${dept}'`);
        return result.rows;
    }
    
    static async getRolesID(title: string) {
        var result = await pool.query(`SELECT id FROM role WHERE title = '${title}'`);
        return result.rows;
    }

    static async getManagersID(manager: string) {
        const array = manager.split(" ");
        var result = await pool.query(`SELECT id FROM employee WHERE first_name = '${array[0]}' AND last_name = '${array[1]}'`);
        return result.rows;
    }

    static async getEmployeeID(employee: string) {
        const array = employee.split(" ");
        var result = await pool.query(`SELECT id FROM employee WHERE first_name = '${array[0]}' AND last_name = '${array[1]}'`);
        return result.rows;
    }
}

    
export default queries;