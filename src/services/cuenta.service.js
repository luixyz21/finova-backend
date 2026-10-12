const CuentaBancaria = require('../models/cuenta.model');
const RepositorioCuentaBancaria = require('../repositories/cuenta.repository');
const GeneradorIBAN = require('../config/generadorIban');

class ServicioCuentaBancaria {
  static async crearCuenta(id_usuario, tipo_cuenta, moneda) {
    if (!id_usuario || !tipo_cuenta || !moneda) {
      throw new Error('El ID de usuario, tipo de cuenta y moneda son obligatorios');
    }

    // Generar IBAN único
    let iban = GeneradorIBAN.generarIbanCostaRica();
    while (await RepositorioCuentaBancaria.buscarPorIban(iban)) {
      iban = GeneradorIBAN.generarIbanCostaRica();
    }

    const nuevaCuenta = new CuentaBancaria({
      id_usuario,
      iban,
      tipo_cuenta,
      saldo: 0.00,
      moneda
    });

    const idCuenta = await RepositorioCuentaBancaria.guardar(nuevaCuenta);
    return { id_cuenta: idCuenta, iban: nuevaCuenta.iban, moneda: nuevaCuenta.moneda, saldo: nuevaCuenta.saldo };
  }

  static async obtenerCuentasUsuario(id_usuario) {
    return await RepositorioCuentaBancaria.buscarPorIdUsuario(id_usuario);
  }
}

module.exports = ServicioCuentaBancaria;