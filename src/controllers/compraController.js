const { OrdenCompra, DetalleCompra, Medicamento, Laboratorio } = require('../models');

const registrar = async (req, res) => {
  try {
    const { laboratorio_id, fecha, detalles } = req.body;

    if (!laboratorio_id || !fecha || !detalles || detalles.length === 0) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    const laboratorio = await Laboratorio.findByPk(laboratorio_id);
    if (!laboratorio) return res.status(404).json({ message: 'Laboratorio no encontrado' });

    let total = 0;
    const orden = await OrdenCompra.create({
      laboratorio_id,
      usuario_id: req.user.id,
      fecha,
      estado: 'RECIBIDA'
    });

    for (const detalle of detalles) {
      const { medicamento_id, cantidad, precio_unitario } = detalle;
      await DetalleCompra.create({ orden_compra_id: orden.id, medicamento_id, cantidad, precio_unitario });

      // Actualizar stock
      const medicamento = await Medicamento.findByPk(medicamento_id);
      if (medicamento) {
        await medicamento.update({ stock: medicamento.stock + cantidad });
      }

      total += cantidad * precio_unitario;
    }

    await orden.update({ total });
    res.status(201).json({ message: 'Orden de compra registrada', orden });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar compra', error: error.message });
  }
};

const listar = async (req, res) => {
  try {
    const ordenes = await OrdenCompra.findAll({
      include: [{ model: Laboratorio }, { model: DetalleCompra, include: [Medicamento] }]
    });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

module.exports = { registrar, listar };
