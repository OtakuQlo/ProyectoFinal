const express = require('express');
const router = express.Router();
const productosController = require('../controller/productosController')

router.post('/',productosController.creandoProductos);
router.get('/',productosController.obtenerProducto);
// router.put('/:id',marcaController.actualizarMarca);
router.delete('/:id',productosController.borrarProducto);
module.exports = router;