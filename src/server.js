const app = require('./app');
const sequelize = require('./config/database');
const Employee = require('./domain/entities/Employee');
const User = require('./domain/entities/User');

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(async () => {
  await User.create({
    email: 'admin@example.com',
    password: 'hashedpassword',
  });

  for (let i = 1; i <= 10; i++) {
    await Employee.create({
      cpf: `1234567890${i}`,
      name: `Employee ${i}`,
      email: `employee${i}@example.com`,
      shirtSize: ['PP', 'M', 'G'][i % 3],
      shoeSize: 38 + (i % 5),
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
    console.log(`Documentation available at ${PORT}/doc`);
  });
});