class CuentaBancaria {
  constructor({ id_cuenta, id_usuario, iban, tipo_cuenta, saldo, moneda, tiene_sobres, fecha_creacion }) {
    this.id_cuenta = id_cuenta || null;
    this.id_usuario = id_usuario;
    this.iban = iban;
    this.tipo_cuenta = tipo_cuenta; // 'AHORRO', 'PLANILLA', 'CORRIENTE'
    this.saldo = saldo || 0.00;
    this.moneda = moneda || 'CRC'; // 'CRC', 'USD'
    this.tiene_sobres = tiene_sobres || false;
    this.fecha_creacion = fecha_creacion || new Date();
  }
}

module.exports = CuentaBancaria;