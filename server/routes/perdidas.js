const express = require('express');
const router = express.Router();
const perdidasController = require('../controller/perdidasController')


router.post('/',perdidasController.creandoPerdida);
router.get('/',perdidasController.obtenerPerdida);
router.get('/:id',perdidasController.obtenerPerdidaId);
router.put('/:id',perdidasController.actualizarPerdida);
router.delete('/:id',perdidasController.borrarPerdida)
module.exports = router;