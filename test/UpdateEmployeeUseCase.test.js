const UpdateEmployeeUseCase = require('../src/application/useCases/UpdateEmployeeUseCase');

describe('UpdateEmployeeUseCase', () => {
  let employeeRepository;
  let updateEmployeeUseCase;

  beforeEach(() => {
    employeeRepository = {
      findById: jest.fn(),
      update: jest.fn()
    };
    updateEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepository);
  });

  it('should update an existing employee', async () => {
    const employeeData = {
      name: 'John Doe Updated',
      email: 'john.doe.updated@example.com',
      shirtSize: 'L',
      shoeSize: 43,
    };

    const existingEmployee = {
      id: 1,
      cpf: '12345678901',
      name: 'John Doe',
      email: 'john.doe@example.com',
      shirtSize: 'M',
      shoeSize: 42,
    };

    employeeRepository.findById.mockResolvedValue(existingEmployee);
    employeeRepository.update.mockResolvedValue([1]);

    const result = await updateEmployeeUseCase.execute(1, employeeData);

    expect(result).toEqual([1]);
    expect(employeeRepository.findById).toHaveBeenCalledTimes(1);
    expect(employeeRepository.update).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if employee is not found', async () => {
    const employeeData = {
      name: 'John Doe Updated',
      email: 'john.doe.updated@example.com',
      shirtSize: 'L',
      shoeSize: 43,
    };

    employeeRepository.findById.mockResolvedValue(null);

    await expect(updateEmployeeUseCase.execute(1, employeeData)).rejects.toThrow('Employee not found');

    expect(employeeRepository.findById).toHaveBeenCalledTimes(1);
    expect(employeeRepository.update).not.toHaveBeenCalled();
  });
});