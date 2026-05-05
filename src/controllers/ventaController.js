const { OrdenVenta, DetalleVenta, Medicamento } = require('../models');

const registrar = async (req, res) => {
  try {
    const { fecha, detalles } = req.body;

    if (!fecha || !detalles || detalles.length === 0) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    // Validar stock antes de crear la orden
    for (const detalle of detalles) {
      const medicamento = await Medicamento.findByPk(detalle.medicamento_id);
      if (!medicamento) {
        return res.status(404).json({ message: `Medicamento ${detalle.medicamento_id} no encontrado` });
      }
      if (medicamento.stock < detalle.cantidad) {
        return res.status(400).json({
          message: `Stock insuficiente para ${medicamento.nombre}. Disponible: ${medicamento.stock}`
        });
      }
    }

    let total = 0;
    const orden = await OrdenVenta.create({
      usuario_id: req.user.id,
      fecha,
      estado: 'COMPLETADA'
    });

    for (const detalle of detalles) {
      const { medicamento_id, cantidad, precio_unitario } = detalle;
      await DetalleVenta.create({ orden_venta_id: orden.id, medicamento_id, cantidad, precio_unitario });

      // Descontar stock
      const medicamento = await Medicamento.findByPk(medicamento_id);
      await medicamento.update({ stock: medicamento.stock - cantidad });

      total += cantidad * precio_unitario;
    }

    await orden.update({ total });
    res.status(201).json({ message: 'Venta registrada', orden });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar venta', error: error.message });
  }
};

const listar = async (req, res) => {
  try {
    const ordenes = await OrdenVenta.findAll({
      include: [{ model: DetalleVenta, include: [Medicamento] }]
    });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

module.exports = { registrar, listar };
