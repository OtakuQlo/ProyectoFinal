const express = require('express');
const router = express.Router();
const tarjetasController = require('../controller/TarjetasController')


router.post('/creartarjeta',tarjetasController.creandoTarjeta);
router.get('/obtenertarjeta/:id',tarjetasController.obtenerTarjeta)
router.put('/actualizartarjeta/:id',tarjetasController.cambiarTarjeta)
router.delete('/eliminartarjeta/:id',tarjetasController.elminarTarjeta)
module.exports = router;