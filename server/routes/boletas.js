const express = require('express');
const router = express.Router();
const boletasController = require('../controller/boletasController')


router.post('/',boletasController.creandoBoletas);
router.get('/:idusuario',boletasController.obtenerBoleta);
router.get('/boletas/:idusuario',boletasController.obtenerBoletas);
router.put('/:id',boletasController.actualizarBoleta);
router.delete('/:id',boletasController.borrarBoleta)
module.exports = router;