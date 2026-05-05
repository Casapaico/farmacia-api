const router      = require('express').Router();
const ctrl        = require('../controllers/compraController');
const verifyToken = require('../middleware/auth');
const checkRol    = require('../middleware/roles');

router.get('/',  verifyToken, checkRol('ADMIN','ALMACEN'), ctrl.listar);
router.post('/', verifyToken, checkRol('ADMIN','ALMACEN'), ctrl.registrar);

module.exports = router;
