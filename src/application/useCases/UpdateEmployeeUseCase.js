class UpdateEmployeeUseCase {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(id, employeeData) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    return await this.employeeRepository.update(id, employeeData);
  }
}

module.exports = UpdateEmployeeUseCase;