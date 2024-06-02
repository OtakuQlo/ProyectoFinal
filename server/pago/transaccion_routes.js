const express = require('express');
const router = express.Router();
const controller = require('./transaccion_controller')
const TransaccionCompleta = require("transbank-sdk").TransaccionCompleta;

router.use(function (req, res, next) {
    TransaccionCompleta.configureForTesting();
    next();
})

router.post("/create", controller.create);
router.post("/commit",controller.commit)
module.exports = router;