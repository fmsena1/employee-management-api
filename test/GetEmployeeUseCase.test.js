const GetEmployeeUseCase = require('../src/application/useCases/GetEmployeeUseCase');

describe('GetEmployeeUseCase', () => {
  let employeeRepository;
  let getEmployeeUseCase;

  beforeEach(() => {
    employeeRepository = {
      findAll: jest.fn()
    };
    getEmployeeUseCase = new GetEmployeeUseCase(employeeRepository);
  });

  it('should return all employees', async () => {
    const employees = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];
    employeeRepository.findAll.mockResolvedValue(employees);

    const result = await getEmployeeUseCase.execute();

    expect(result).toEqual(employees);
    expect(employeeRepository.findAll).toHaveBeenCalledTimes(1);
  });
});