const express = require('express');
const router = express.Router();
const { recuperarCuenta } = require('../resend/controllerMail');

router.post('/', recuperarCuenta);

module.exports = router;
