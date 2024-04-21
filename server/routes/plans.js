const express = require('express');
const router = express.Router();
const plansController = require('../controller/plansController')

router.get('/',plansController.obtenerPlan);
router.get('/:id',plansController.obtenerPlanId);
module.exports = router;