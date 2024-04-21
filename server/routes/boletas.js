const express = require('express');
const router = express.Router();
const boletasController = require('../controller/boletasController')


router.post('/',boletasController.creandoBoletas);
router.get('/',boletasController.obtenerBoleta);
router.get('/:id',boletasController.obtenerBoletaId);
router.put('/:id',boletasController.actualizarBoleta);
router.delete('/:id',boletasController.borrarBoleta)
module.exports = router;