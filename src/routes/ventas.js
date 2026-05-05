const router      = require('express').Router();
const ctrl        = require('../controllers/ventaController');
const verifyToken = require('../middleware/auth');
const checkRol    = require('../middleware/roles');

router.get('/',  verifyToken, checkRol('ADMIN','VENDEDOR'), ctrl.listar);
router.post('/', verifyToken, checkRol('ADMIN','VENDEDOR'), ctrl.registrar);

module.exports = router;
