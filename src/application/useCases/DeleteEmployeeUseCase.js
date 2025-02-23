class DeleteEmployeeUseCase {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(ids) {
    if (!Array.isArray(ids)) {
      throw new Error('Invalid input, expected an array of IDs');
    }
    return await this.employeeRepository.delete(ids);
  }
}

module.exports = DeleteEmployeeUseCase;