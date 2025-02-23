const { Sequelize } = require('@sequelize/core');
const { SqliteDialect } = require('@sequelize/sqlite3');

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: 'sequelize.sqlite',
});

module.exports = sequelize;
