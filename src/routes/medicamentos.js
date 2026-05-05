const router      = require('express').Router();
const ctrl        = require('../controllers/medicamentoController');
const verifyToken = require('../middleware/auth');
const checkRol    = require('../middleware/roles');

router.get('/',       verifyToken,                              ctrl.listar);
router.post('/',      verifyToken, checkRol('ADMIN','ALMACEN'), ctrl.crear);
router.put('/:id',    verifyToken, checkRol('ADMIN','ALMACEN'), ctrl.actualizar);
router.delete('/:id', verifyToken, checkRol('ADMIN'),           ctrl.eliminar);

module.exports = router;
