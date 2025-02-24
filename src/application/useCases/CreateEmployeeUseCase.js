class CreateEmployeeUseCase {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(employeeData) {
    const existingEmployee = await this.employeeRepository.findByCpf(employeeData.cpf);
    if (existingEmployee) {
      throw new Error('Employee with this CPF already exists');
    }
    try {
      return await this.employeeRepository.create(employeeData);
    } catch (error) {
      throw new Error(`Failed to create employee: ${error.message}`);
    }
  }
}

module.exports = CreateEmployeeUseCase;