const express = require('express');
const router = express.Router();
const { informeVentasPerfiles } = require('./informesControlador');

router.get('/', informeVentasPerfiles);

module.exports = router;
