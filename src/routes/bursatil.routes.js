const express = require('express');
const router = express.Router();
const ControladorBursatil = require('../controllers/bursatil.controller');

router.get('/acciones', ControladorBursatil.obtenerCatalogo);
router.post('/comprar', ControladorBursatil.comprar);

module.exports = router;