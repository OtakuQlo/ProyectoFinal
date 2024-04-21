const express = require('express');
const router = express.Router();
const detalleController = require('../controller/detallesVentasController')


router.post('/',detalleController.creandoDetalle);
router.get('/',detalleController.obtenerDetalle);
router.get('/:id',detalleController.obtenerDetalleId);
router.put('/:id',detalleController.actualizarDetalle);
router.delete('/:id',detalleController.borrarDetalle)
module.exports = router;