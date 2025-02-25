const app = require('./app');
const sequelize = require('./config/database');
const User = require('./domain/entities/User'); // Certifique-se de importar o modelo User
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(async () => {
  const initialUser = {
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
  };

  try {
    await User.create(initialUser);
    console.log('Initial user created:', initialUser.email);
  } catch (error) {
    console.error('Error creating initial user:', error);
  }

  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
    console.log(`Documentation available at ${PORT}/doc`);
  });
});