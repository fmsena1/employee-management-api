const CreateEmployeeUseCase = require('../src/application/useCases/CreateEmployeeUseCase');

describe('CreateEmployeeUseCase', () => {
  let employeeRepository;
  let createEmployeeUseCase;

  beforeEach(() => {
    employeeRepository = {
      findByCpf: jest.fn(),
      create: jest.fn()
    };
    createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository);
  });

  it('should create a new employee', async () => {
    const employeeData = {
      cpf: '12345678901',
      name: 'John Doe',
      email: 'john.doe@example.com',
      shirtSize: 'M',
      shoeSize: 42,
    };

    employeeRepository.findByCpf.mockResolvedValue(null);
    employeeRepository.create.mockResolvedValue(employeeData);

    const result = await createEmployeeUseCase.execute(employeeData);

    expect(result).toEqual(employeeData);
    expect(employeeRepository.findByCpf).toHaveBeenCalledTimes(1);
    expect(employeeRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if employee with CPF already exists', async () => {
    const employeeData = {
      cpf: '12345678901',
      name: 'John Doe',
      email: 'john.doe@example.com',
      shirtSize: 'M',
      shoeSize: 42,
    };

    employeeRepository.findByCpf.mockResolvedValue(employeeData);

    await expect(createEmployeeUseCase.execute(employeeData)).rejects.toThrow('Employee with this CPF already exists');

    expect(employeeRepository.findByCpf).toHaveBeenCalledTimes(1);
    expect(employeeRepository.create).not.toHaveBeenCalled();
  });
});