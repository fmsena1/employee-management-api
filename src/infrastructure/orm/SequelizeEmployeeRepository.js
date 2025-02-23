const EmployeeRepository = require('../../domain/repositories/EmployeeRepository');
const Employee = require('../../domain/entities/Employee');

class SequelizeEmployeeRepository extends EmployeeRepository {
  async create(employee) {
    const createdEmployee = await Employee.create(employee);
    return createdEmployee;
  }

  async findAll() {
    const employees = await Employee.findAll();
    return employees;
  }

  async findById(id) {
    const employee = await Employee.findByPk(id);
    return employee;
  }

  async update(id, employeeData) {
    const [updated] = await Employee.update(employeeData, {
      where: { id }
    });
    return updated;
  }

  async delete(ids) {
    const deleted = await Employee.destroy({
      where: { id: ids }
    });
    return deleted;
  }
}

module.exports = SequelizeEmployeeRepository;