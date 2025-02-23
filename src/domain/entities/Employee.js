const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/database");

const Employee = sequelize.define("Employee", {
  cpf: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  shirtSize: { type: DataTypes.ENUM('PP', 'P', 'M', 'G', 'GG', 'EXG', "EX1", "EX2", "EX3", "EX4", "EX5", "EX6"), allowNull: false },
  shoeSize: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Employee;

