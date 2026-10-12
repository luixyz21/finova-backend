const express = require('express');
const router = express.Router();
const ControladorTarjeta = require('../controllers/tarjeta.controller');

router.post('/generar', ControladorTarjeta.crear);
router.get('/cuenta/:idCuenta', ControladorTarjeta.obtenerPorCuenta);
router.patch('/destruir/:idTarjeta', ControladorTarjeta.destruirTemporal);

module.exports = router;