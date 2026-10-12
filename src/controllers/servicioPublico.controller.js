const ServicioPagoServicios = require('../services/servicioPublico.service');

class ControladorServicioPublico {
  static async obtenerServicios(req, res) {
    try {
      const servicios = await ServicioPagoServicios.listarServicios();
      res.status(200).json({ exito: true, data: servicios });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }

  static async consultarFactura(req, res) {
    try {
      const { idServicio, nise } = req.params;
      const factura = await ServicioPagoServicios.consultarFactura(idServicio, nise);
      res.status(200).json({ exito: true, data: factura });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }

  static async pagar(req, res) {
    try {
      const resultado = await ServicioPagoServicios.pagarServicio(req.body);
      res.status(200).json({
        exito: true,
        mensaje: 'Pago de servicio procesado con éxito',
        data: resultado
      });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }
}

module.exports = ControladorServicioPublico;