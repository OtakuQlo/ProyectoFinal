const express = require('express');
const router = express.Router();
const usuariosController = require('../controller/usuariosController')


router.post('/',usuariosController.creandoUsuarios);
router.get('/',usuariosController.obtenerUsuarios);
router.get('/:email',usuariosController.obtenerUsuariosEmail);
router.put('/:id',usuariosController.actualizarContra);
module.exports = router;