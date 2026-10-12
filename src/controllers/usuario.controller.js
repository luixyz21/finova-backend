const ServicioUsuario = require('../services/usuario.service');

class ControladorUsuario {
  static async registrar(req, res) {
    try {
      const usuarioCreado = await ServicioUsuario.registrar(req.body);
      res.status(201).json({
        exito: true,
        mensaje: 'Usuario registrado correctamente',
        data: usuarioCreado
      });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { nombre_usuario, contrasena } = req.body;
      const usuarioAutenticado = await ServicioUsuario.iniciarSesion(nombre_usuario, contrasena);
      res.status(200).json({
        exito: true,
        mensaje: 'Inicio de sesión exitoso',
        data: usuarioAutenticado
      });
    } catch (error) {
      res.status(401).json({ exito: false, mensaje: error.message });
    }
  }
}

module.exports = ControladorUsuario;