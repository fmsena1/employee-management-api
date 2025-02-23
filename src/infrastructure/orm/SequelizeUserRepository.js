const UserRepository = require('../../domain/repositories/UserRepository');
const User = require('../../domain/entities/User');

class SequelizeUserRepository extends UserRepository {
  async create(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}

module.exports = SequelizeUserRepository;