const express = require('express');
const router = express.Router();
const controllerMail = require('../resend/controllerMail');

router.post('/recuperarcuenta', controllerMail.recuperarCuenta);
router.post('/respuestaError', controllerMail.respuestaError);


module.exports = router;
