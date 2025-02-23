const SequelizeUserRepository = require('../../orm/SequelizeUserRepository');
const AuthenticateUserUseCase = require('../../../application/useCases/AuthenticateUserUseCase');
const bcrypt = require('bcrypt');
const logger = require('../../../config/logger');

const userRepository = new SequelizeUserRepository();

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ email, password: hashedPassword });
    logger.info(`User registered: ${email}`);
    res.status(201).json(user);
  } catch (err) {
    logger.error(`Registration error: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  const { email, password } = req.body;
  try {
    const { token } = await authenticateUserUseCase.execute(email, password);
    logger.info(`User logged in: ${email}`);
    res.json({ token });
  } catch (err) {
    logger.warn(`Invalid login attempt: ${email}`);
    logger.error(`Login error: ${err.message}`);
    res.status(401).json({ error: err.message });
  }
};

module.exports = { register, login };