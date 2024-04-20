const express = require('express');
const router = express.Router();
const marcaController = require('../controller/marcaController')

router.post('/',marcaController.creandoMarca);
router.get('/',marcaController.obtenerMarca);
router.put('/:id',marcaController.actualizarMarca)
module.exports = router;