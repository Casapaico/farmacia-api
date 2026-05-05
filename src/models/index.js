const sequelize     = require('../config/database');
const Usuario       = require('./Usuario');
const Medicamento   = require('./Medicamento');
const Laboratorio   = require('./Laboratorio');
const OrdenCompra   = require('./OrdenCompra');
const DetalleCompra = require('./DetalleCompra');
const OrdenVenta    = require('./OrdenVenta');
const DetalleVenta  = require('./DetalleVenta');

// Compras
Laboratorio.hasMany(OrdenCompra,   { foreignKey: 'laboratorio_id' });
OrdenCompra.belongsTo(Laboratorio, { foreignKey: 'laboratorio_id' });

Usuario.hasMany(OrdenCompra,   { foreignKey: 'usuario_id' });
OrdenCompra.belongsTo(Usuario, { foreignKey: 'usuario_id' });

OrdenCompra.hasMany(DetalleCompra,   { foreignKey: 'orden_compra_id' });
DetalleCompra.belongsTo(OrdenCompra, { foreignKey: 'orden_compra_id' });

Medicamento.hasMany(DetalleCompra,   { foreignKey: 'medicamento_id' });
DetalleCompra.belongsTo(Medicamento, { foreignKey: 'medicamento_id' });

// Ventas
Usuario.hasMany(OrdenVenta,   { foreignKey: 'usuario_id' });
OrdenVenta.belongsTo(Usuario, { foreignKey: 'usuario_id' });

OrdenVenta.hasMany(DetalleVenta,   { foreignKey: 'orden_venta_id' });
DetalleVenta.belongsTo(OrdenVenta, { foreignKey: 'orden_venta_id' });

Medicamento.hasMany(DetalleVenta,   { foreignKey: 'medicamento_id' });
DetalleVenta.belongsTo(Medicamento, { foreignKey: 'medicamento_id' });

module.exports = {
  sequelize,
  Usuario, Medicamento, Laboratorio,
  OrdenCompra, DetalleCompra,
  OrdenVenta, DetalleVenta
};
