const express = require('express');
const router = express.Router();
const usuariosController = require('../controller/usuariosController')


router.post('/',usuariosController.creandoUsuarios);
router.get('/',usuariosController.obtenerUsuarios);
router.get('/email/:email',usuariosController.obtenerUsuariosEmail);
router.get('/usuarioid/:id',usuariosController.obtenerUsuariosId);
router.get('/existente/',usuariosController.usuarioExistenete)
router.put('/:id',usuariosController.actualizarContra);
router.put('/actualizarUsuario/:id',usuariosController.actualizarUsuarioInformacion);
router.put('/planes/:id',usuariosController.actualizarPlan);

module.exports = router;