const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medicamento = sequelize.define('Medicamento', {
  id:               { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:           { type: DataTypes.STRING(150), allowNull: false },
  descripcion:      { type: DataTypes.TEXT },
  precio:           { type: DataTypes.DECIMAL(10,2), allowNull: false },
  stock:            { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  fecha_vencimiento:{ type: DataTypes.DATEONLY }
}, { tableName: 'medicamentos', timestamps: true });

module.exports = Medicamento;
