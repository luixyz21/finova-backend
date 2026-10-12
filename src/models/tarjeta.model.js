class Tarjeta {
  constructor({ id_tarjeta, id_cuenta, numero_tarjeta, fecha_vencimiento, cvv, tipo, estado, fecha_creacion }) {
    this.id_tarjeta = id_tarjeta || null;
    this.id_cuenta = id_cuenta;
    this.numero_tarjeta = numero_tarjeta;
    this.fecha_vencimiento = fecha_vencimiento; // Formato "MM/YY"
    this.cvv = cvv;
    this.tipo = tipo; // 'FIJA' o 'TEMPORAL'
    this.estado = estado || 'ACTIVA'; // 'ACTIVA' o 'DESTRUIDA'
    this.fecha_creacion = fecha_creacion || new Date();
  }
}

module.exports = Tarjeta;