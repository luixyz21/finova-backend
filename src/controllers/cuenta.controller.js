const ServicioCuentaBancaria = require('../services/cuenta.service');

class ControladorCuentaBancaria {
  static async crear(req, res) {
    try {
      const { id_usuario, tipo_cuenta, moneda } = req.body;
      const cuentaCreada = await ServicioCuentaBancaria.crearCuenta(id_usuario, tipo_cuenta, moneda);
      res.status(201).json({
        exito: true,
        mensaje: 'Cuenta bancaria aperturada exitosamente',
        data: cuentaCreada
      });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }

  static async obtenerPorUsuario(req, res) {
    try {
      const { idUsuario } = req.params;
      const cuentas = await ServicioCuentaBancaria.obtenerCuentasUsuario(idUsuario);
      res.status(200).json({
        exito: true,
        data: cuentas
      });
    } catch (error) {
      res.status(400).json({ exito: false, mensaje: error.message });
    }
  }
}

module.exports = ControladorCuentaBancaria;