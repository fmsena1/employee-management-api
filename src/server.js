const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(async () => {
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
    console.log(`Documentation available at ${PORT}/doc`);
  });
});