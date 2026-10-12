const express = require('express');
const router = express.Router();
const ControladorServicioPublico = require('../controllers/servicioPublico.controller');

router.get('/cat', ControladorServicioPublico.obtenerServicios);
router.get('/consultar/:idServicio/:nise', ControladorServicioPublico.consultarFactura);
router.post('/pagar', ControladorServicioPublico.pagar);

module.exports = router;