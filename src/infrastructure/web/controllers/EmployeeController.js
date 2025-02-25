const SequelizeEmployeeRepository = require('../../orm/SequelizeEmployeeRepository');
const CreateEmployeeUseCase = require('../../../application/useCases/CreateEmployeeUseCase');
const GetEmployeeUseCase = require('../../../application/useCases/GetEmployeeUseCase');
const UpdateEmployeeUseCase = require('../../../application/useCases/UpdateEmployeeUseCase');
const DeleteEmployeeUseCase = require('../../../application/useCases/DeleteEmployeeUseCase');
const sendEmailService = require('../../../infrastructure/services/SendEmailService');
const logger = require('../../../config/logger');

const employeeRepository = new SequelizeEmployeeRepository();

const createEmployee = async (req, res) => {
  const createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository);
  try {
    const employee = await createEmployeeUseCase.execute(req.body);
    logger.info(`Employee created: ${employee.id}`);
    res.status(201).json(employee);
  } catch (err) {
    logger.error(`Error creating employee: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const getAllEmployees = async (req, res) => {
  const getEmployeeUseCase = new GetEmployeeUseCase(employeeRepository);
  try {
    const employees = await getEmployeeUseCase.execute();
    logger.info('Fetched all employees');
    res.json(employees);
  } catch (err) {
    logger.error(`Error fetching employees: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

const updateEmployee = async (req, res) => {
  const updateEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepository);
  try {
    const employee = await updateEmployeeUseCase.execute(req.params.id, req.body);
    logger.info(`Employee updated: ${employee.id}`);
    res.json(employee);
  } catch (err) {
    logger.error(`Error updating employee: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const deleteEmployees = async (req, res) => {
  const deleteEmployeeUseCase = new DeleteEmployeeUseCase(employeeRepository);
  try {
    await deleteEmployeeUseCase.execute(req.body.ids);
    logger.info(`Employees deleted: ${req.body.ids.join(', ')}`);
    res.status(204).send();
  } catch (err) {
    logger.error(`Error deleting employees: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

const sendEmail = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      logger.warn('Invalid input, expected an array of IDs');
      return res.status(400).json({ error: "Invalid input, expected an array of IDs" });
    }

    const employees = await employeeRepository.findAll({
      where: {
        id: ids
      }
    });

    if (employees.length > 0) {
      await sendEmailService.send(employees);
      logger.info(`Emails sent to employees: ${ids.join(', ')}`);
      res.status(200).json({ message: "Emails sent successfully" });
    } else {
      logger.warn(`Employees not found: ${ids.join(', ')}`);
      res.status(404).json({ error: "Employees not found" });
    }
  } catch (err) {
    console.error(err);
    logger.error(`Error sending emails: ${err}`);
    if (err.response) {
      logger.error(`Response body: ${JSON.stringify(err.response.body)}`);
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployees,
  sendEmail,
};