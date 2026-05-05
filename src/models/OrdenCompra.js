const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenCompra = sequelize.define('OrdenCompra', {
  id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  laboratorio_id:{ type: DataTypes.INTEGER, allowNull: false },
  usuario_id:    { type: DataTypes.INTEGER, allowNull: false },
  fecha:         { type: DataTypes.DATEONLY, allowNull: false },
  total:         { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  estado:        { type: DataTypes.ENUM('PENDIENTE','RECIBIDA','CANCELADA'), defaultValue: 'PENDIENTE' }
}, { tableName: 'ordenes_compra', timestamps: true });

module.exports = OrdenCompra;
