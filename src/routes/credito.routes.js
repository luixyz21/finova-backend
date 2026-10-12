const express = require('express');
const router = express.Router();
const ControladorCredito = require('../controllers/credito.controller');

router.post('/solicitar', ControladorCredito.solicitar);

module.exports = router;