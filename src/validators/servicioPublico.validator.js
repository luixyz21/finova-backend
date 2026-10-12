class ValidadorServicioPublico {
  static validarPago({ id_cuenta, id_servicio, nise, monto }, saldoCuenta) {
    if (!id_cuenta || !id_servicio || !nise || !monto) {
      throw new Error('La cuenta, el servicio, el número de referencia (NISE) y el monto son obligatorios');
    }

    if (monto <= 0) {
      throw new Error('El monto del pago debe ser mayor a cero');
    }

    if (saldoCuenta < monto) {
      throw new Error('Saldo insuficiente en la cuenta para realizar el pago del servicio');
    }
  }
}

module.exports = ValidadorServicioPublico;