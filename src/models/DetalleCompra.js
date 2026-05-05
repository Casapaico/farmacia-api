const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetalleCompra = sequelize.define('DetalleCompra', {
  id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orden_compra_id:{ type: DataTypes.INTEGER, allowNull: false },
  medicamento_id: { type: DataTypes.INTEGER, allowNull: false },
  cantidad:       { type: DataTypes.INTEGER, allowNull: false },
  precio_unitario:{ type: DataTypes.DECIMAL(10,2), allowNull: false }
}, { tableName: 'detalle_compra', timestamps: true });

module.exports = DetalleCompra;
