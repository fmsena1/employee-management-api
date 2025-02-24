const DeleteEmployeeUseCase = require('../src/application/useCases/DeleteEmployeeUseCase');

describe('DeleteEmployeeUseCase', () => {
  let employeeRepository;
  let deleteEmployeeUseCase;

  beforeEach(() => {
    employeeRepository = {
      delete: jest.fn()
    };
    deleteEmployeeUseCase = new DeleteEmployeeUseCase(employeeRepository);
  });

  it('should delete employees by ids', async () => {
    const ids = [1, 2, 3];
    employeeRepository.delete.mockResolvedValue(3);

    const result = await deleteEmployeeUseCase.execute(ids);

    expect(result).toEqual(3);
    expect(employeeRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if input is not an array', async () => {
    const ids = 'not-an-array';

    await expect(deleteEmployeeUseCase.execute(ids)).rejects.toThrow('Invalid input, expected an array of IDs');

    expect(employeeRepository.delete).not.toHaveBeenCalled();
  });
});