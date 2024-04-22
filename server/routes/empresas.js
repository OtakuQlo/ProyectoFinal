const express = require('express');
const router = express.Router();
const empresasControler = require('../controller/EmpresasController')

router.post('/',empresasControler.creandoEmpresa);
router.get('/',empresasControler.obtenerEmpresa);
module.exports = router;