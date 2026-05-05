const router = require('express').Router();
const { Laboratorio } = require('../models');
const verifyToken = require('../middleware/auth');
const checkRol = require('../middleware/roles');

router.get('/', verifyToken, async (req, res) => {
  const data = await Laboratorio.findAll();
  res.json(data);
});

router.post('/', verifyToken, checkRol('ADMIN','ALMACEN'), async (req, res) => {
  try {
    const lab = await Laboratorio.create(req.body);
    res.status(201).json(lab);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;