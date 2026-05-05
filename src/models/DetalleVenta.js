const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetalleVenta = sequelize.define('DetalleVenta', {
  id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orden_venta_id:{ type: DataTypes.INTEGER, allowNull: false },
  medicamento_id:{ type: DataTypes.INTEGER, allowNull: false },
  cantidad:      { type: DataTypes.INTEGER, allowNull: false },
  precio_unitario:{ type: DataTypes.DECIMAL(10,2), allowNull: false }
}, { tableName: 'detalle_venta', timestamps: true });

module.exports = DetalleVenta;
