class CreateEmployeeUseCase {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(employeeData) {
    return await this.employeeRepository.create(employeeData);
  }
}

module.exports = CreateEmployeeUseCase;