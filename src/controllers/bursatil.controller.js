const ServicioBursatil = require('../services/bursatil.service');

class ControladorBursatil {
  static async obtenerCatalogo(req, res) {
    try {
      const acciones = await ServicioBursatil.obtenerCatalogo();
      res.status(200).json({ exito: true, data: acciones });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }

  static async comprar(req, res) {
    try {
      const resultado = await ServicioBursatil.comprarAcciones(req.body);
      res.status(200).json({
        exito: true,
        mensaje: 'Compra de acciones realizada con éxito',
        data: resultado
      });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }
}

module.exports = ControladorBursatil;