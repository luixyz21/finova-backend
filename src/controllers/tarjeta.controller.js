const ServicioTarjeta = require('../services/tarjeta.service');

class ControladorTarjeta {
  static async crear(req, res) {
    try {
      const tarjetaCreada = await ServicioTarjeta.generarTarjeta(req.body);
      res.status(201).json({
        exito: true,
        mensaje: 'Tarjeta emitida correctamente',
        data: tarjetaCreada
      });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }

  static async obtenerPorCuenta(req, res) {
    try {
      const { idCuenta } = req.params;
      const tarjetas = await ServicioTarjeta.obtenerPorCuenta(idCuenta);
      res.status(200).json({
        exito: true,
        data: tarjetas
      });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }

  static async destruirTemporal(req, res) {
    try {
      const { idTarjeta } = req.params;
      const resultado = await ServicioTarjeta.destruirTarjetaTemporal(idTarjeta);
      res.status(200).json({
        exito: true,
        mensaje: resultado.mensaje
      });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }
}

module.exports = ControladorTarjeta;