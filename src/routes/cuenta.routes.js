const express = require('express');
const router = express.Router();
const ControladorCuentaBancaria = require('../controllers/cuenta.controller');

router.post('/crear', ControladorCuentaBancaria.crear);
router.get('/usuario/:idUsuario', ControladorCuentaBancaria.obtenerPorUsuario);

module.exports = router;