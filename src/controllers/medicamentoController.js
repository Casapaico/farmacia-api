const { Medicamento } = require('../models');

const listar = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll();
    res.json(medicamentos);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar', error: error.message });
  }
};

const crear = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, fecha_vencimiento } = req.body;
    if (!nombre || !precio) {
      return res.status(400).json({ message: 'Nombre y precio son obligatorios' });
    }
    const medicamento = await Medicamento.create({ nombre, descripcion, precio, stock, fecha_vencimiento });
    res.status(201).json(medicamento);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear', error: error.message });
  }
};

const actualizar = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id);
    if (!medicamento) return res.status(404).json({ message: 'No encontrado' });
    await medicamento.update(req.body);
    res.json(medicamento);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
};

const eliminar = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id);
    if (!medicamento) return res.status(404).json({ message: 'No encontrado' });
    await medicamento.destroy();
    res.json({ message: 'Medicamento eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar', error: error.message });
  }
};

module.exports = { listar, crear, actualizar, eliminar };
