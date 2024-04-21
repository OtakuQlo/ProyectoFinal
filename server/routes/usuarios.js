const express = require('express');
const router = express.Router();
const usuariosController = require('../controller/usuariosController')


router.post('/',usuariosController.creandoUsuarios);
router.get('/',usuariosController.obtenerUsuarios);
router.put('/:id',usuariosController.actualizarContra);
module.exports = router;