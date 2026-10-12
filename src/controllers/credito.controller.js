const ServicioCredito = require('../services/credito.service');

class ControladorCredito {
  static async solicitar(req, res) {
    try {
      const resultado = await ServicioCredito.solicitarCredito(req.body);
      res.status(201).json({
        exito: true,
        mensaje: 'Crédito aprobado y desembolsado exitosamente',
        data: resultado
      });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }
}

module.exports = ControladorCredito;