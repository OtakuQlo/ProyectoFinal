const express = require('express');
const router = express.Router();
const stockController = require('../controller/stockProducts')



router.get('/:id',stockController.obtenerStock);
router.get('/stock/:idproducto',stockController.obtenerStockProducto);

module.exports = router;