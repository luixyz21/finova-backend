class ServicioPublico {
  constructor({ id_servicio, nombre_servicio, categoria, descripcion }) {
    this.id_servicio = id_servicio || null;
    this.nombre_servicio = nombre_servicio;
    this.categoria = categoria;
    this.descripcion = descripcion || '';
  }
}

module.exports = ServicioPublico;