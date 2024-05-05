const express = require('express');
const router = express.Router();
const perfilesControler = require('../controller/perfilesController')


router.post('/',perfilesControler.creandoPerfiles);
router.get('/:idusuario',perfilesControler.obtenerPerfil);
/* router.get('/:id',perfilesControler.obtenerPerfilId); */
router.delete('/:id',perfilesControler.borrarPerfil);
module.exports = router;