const jwt = require('jsonwebtoken');
const logger = require('../../../config/logger');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    logger.warn('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    logger.info(`Token verified for user ID: ${req.userId}`);
    next();
  } catch (err) {
    logger.error(`Invalid token: ${err.message}`);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;