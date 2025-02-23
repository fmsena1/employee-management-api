class GetEmployeeUseCase {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute() {
    return await this.employeeRepository.findAll();
  }
}

module.exports = GetEmployeeUseCase;