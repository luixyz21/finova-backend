class ValidadorCredito {
  static validarSolicitud({ id_cuenta_deposito, monto_solicitado, plazo_meses }) {
    if (!id_cuenta_deposito || !monto_solicitado || !plazo_meses) {
      throw new Error('La cuenta de depósito, el monto solicitado y el plazo son obligatorios');
    }

    if (monto_solicitado <= 0) {
      throw new Error('El monto del crédito debe ser mayor a cero');
    }

    if (plazo_meses <= 0 || plazo_meses > 60) {
      throw new Error('El plazo del crédito debe estar entre 1 y 60 meses');
    }
  }
}

module.exports = ValidadorCredito;