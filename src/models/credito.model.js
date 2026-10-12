class Credito {
  constructor({ id_credito, id_cuenta_deposito, monto_solicitado, tasa_interes_anual, plazo_meses, cuota_estimada, fecha_aprobacion }) {
    this.id_credito = id_credito || null;
    this.id_cuenta_deposito = id_cuenta_deposito;
    this.monto_solicitado = monto_solicitado;
    this.tasa_interes_anual = tasa_interes_anual || 10.00;
    this.plazo_meses = plazo_meses;
    this.cuota_estimada = cuota_estimada;
    this.fecha_aprobacion = fecha_aprobacion || new Date();
  }
}

module.exports = Credito;