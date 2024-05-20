const express = require('express');
const router = express.Router();
const boletasController = require('../controller/boletasController')


router.post('/',boletasController.creandoBoletas);
router.get('/:idperfil',boletasController.obtenerBoleta);
router.get('/boletas/:id',boletasController.obtenerBoletas);
router.put('/:id',boletasController.actualizarBoleta);
router.delete('/:id',boletasController.borrarBoleta)
module.exports = router;