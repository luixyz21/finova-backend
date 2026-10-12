class Accion {
  constructor({ id_accion, ticker, empresa, precio_actual_usd }) {
    this.id_accion = id_accion || null;
    this.ticker = ticker;
    this.empresa = empresa;
    this.precio_actual_usd = precio_actual_usd;
  }
}

class PosicionAccion {
  constructor({ id_posicion, id_portafolio, id_accion, cantidad_acciones, precio_promedio_compra }) {
    this.id_posicion = id_posicion || null;
    this.id_portafolio = id_portafolio;
    this.id_accion = id_accion;
    this.cantidad_acciones = cantidad_acciones;
    this.precio_promedio_compra = precio_promedio_compra;
  }
}

module.exports = { Accion, PosicionAccion };