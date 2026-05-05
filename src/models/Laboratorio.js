const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Laboratorio = sequelize.define('Laboratorio', {
  id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:    { type: DataTypes.STRING(150), allowNull: false },
  contacto:  { type: DataTypes.STRING(100) },
  telefono:  { type: DataTypes.STRING(20) }
}, { tableName: 'laboratorios', timestamps: true });

module.exports = Laboratorio;
