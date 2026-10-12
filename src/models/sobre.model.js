class Sobre {
  constructor({ id_sobre, id_cuenta, nombre, descripcion, monto, fecha_creacion }) {
    this.id_sobre = id_sobre || null;
    this.id_cuenta = id_cuenta;
    this.nombre = nombre;
    this.descripcion = descripcion || '';
    this.monto = monto || 0.00;
    this.fecha_creacion = fecha_creacion || new Date();
  }
}

module.exports = Sobre;