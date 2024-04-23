const express = require('express');
const router = express.Router();
const reportesController = require('../controller/reportesController')


router.post('/',reportesController.creandoReporte);
router.get('/',reportesController.obtenerReportes);
router.get('/:id',reportesController.obtenerReporteId);
router.put('/:id',reportesController.responderReporte);
router.delete('/:id',reportesController.borrarReporte);
module.exports = router;