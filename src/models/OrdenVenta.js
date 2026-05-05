const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenVenta = sequelize.define('OrdenVenta', {
  id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  fecha:      { type: DataTypes.DATEONLY, allowNull: false },
  total:      { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  estado:     { type: DataTypes.ENUM('PENDIENTE','COMPLETADA','CANCELADA'), defaultValue: 'PENDIENTE' }
}, { tableName: 'ordenes_venta', timestamps: true });

module.exports = OrdenVenta;
