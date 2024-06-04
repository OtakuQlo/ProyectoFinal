const express = require('express');
const router = express.Router();
const informeVentasEmp = require('../controller/informeController');

// Definir la ruta para obtener todos los usuarios
router.get('/ventasEMP/:id_user', informeVentasEmp.informeVentasEmp);
router.get('/ventas/:idusuario', informeVentasEmp.informeVentas);
router.get('/productoP/:idusuario', informeVentasEmp.informeProductoP);
router.get('/productoMP/:idusuario', informeVentasEmp.informeProductoMP);
router.get('/mermas/:idusuario', informeVentasEmp.informeMermas);

module.exports = router;