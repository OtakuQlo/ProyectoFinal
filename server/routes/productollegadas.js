const express = require('express');
const router = express.Router();
const productoLlegadas = require('../controller/productoLlegadasController')

router.post('/',productoLlegadas.creandoProductosLlegada);
router.get('/',productoLlegadas.obtenerInventario);
router.put('/:id',productoLlegadas.actualizarProducto);
router.delete('/:id',productoLlegadas.borrarRegistro);
module.exports = router;