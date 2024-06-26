const express = require('express');
const router = express.Router();
const productosController = require('../controller/productosController')

router.post('/',productosController.creandoProductos);
router.get('/producto/:barcode',productosController.obtenerProductoBarcode)
router.put('/:id',productosController.actualizarProducto);
router.get('/stock/:id',productosController.obtenerProductosMarca)
router.get('/id/:id',productosController.obtenerProductoId)

router.delete('/:id',productosController.borrarProducto);
module.exports = router;