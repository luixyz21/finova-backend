const express = require('express');
const router = express.Router();
const ControladorSobre = require('../controllers/sobre.controller');

router.post('/crear', ControladorSobre.crear);
router.get('/cuenta/:idCuenta', ControladorSobre.obtenerPorCuenta);

module.exports = router;