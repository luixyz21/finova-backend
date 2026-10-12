const express = require('express');
const router = express.Router();
const ControladorUsuario = require('../controllers/usuario.controller');

router.post('/registro', ControladorUsuario.registrar);
router.post('/login', ControladorUsuario.login);

module.exports = router;