const express = require('express');
const router = express.Router();
const perdidasController = require('../controller/perdidasController')


router.post('/',perdidasController.creandoReporte);
router.get('/',perdidasController.obtenerReportes);
router.get('/:id',perdidasController.obtenerReporteId);
router.put('/:id',perdidasController.actualizarReporte);
router.delete('/:id',perdidasController.borrarReporte)
module.exports = router;