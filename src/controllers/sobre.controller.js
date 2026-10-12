const ServicioSobre = require('../services/sobre.service');

class ControladorSobre {
  static async crear(req, res) {
    try {
      const sobreCreado = await ServicioSobre.crearSobre(req.body);
      res.status(201).json({
        exito: true,
        mensaje: 'Sobre creado y fondos asignados correctamente',
        data: sobreCreado
      });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }

  static async obtenerPorCuenta(req, res) {
    try {
      const { idCuenta } = req.params;
      const sobres = await ServicioSobre.obtenerPorCuenta(idCuenta);
      res.status(200).json({
        exito: true,
        data: sobres
      });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }
}

module.exports = ControladorSobre;