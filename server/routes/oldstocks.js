const express = require('express');
const router = express.Router();
const oldStocksController = require('../controller/oldstocksController')


router.get('/:id',oldStocksController.obtenerOldStockId);
router.put('/:id',oldStocksController.actualizarEstado)

module.exports = router;