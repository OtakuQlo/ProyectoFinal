const express = require('express');
const router = express.Router();
const perfilesControler = require('../controller/perfilesController')


router.post('/',perfilesControler.creandoPerfiles);
router.post('/admin/',perfilesControler.crearPerfilAdmin);
router.get('/:idusuario',perfilesControler.obtenerPerfil);
router.get('/perfil/:id',perfilesControler.obtenerPerfilId);
router.get('/:idusuario/cantidad',perfilesControler.cantidadPerfiles);
router.put('/:id',perfilesControler.actualizarPerfil);
router.put('/ON/:id',perfilesControler.statusON)
router.put('/OFF/:id',perfilesControler.statusOFF)
router.delete('/:id',perfilesControler.borrarPerfil);
module.exports = router;