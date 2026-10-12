const pool = require('../config/database');

class RepositorioBursatil {
  static async obtenerAcciones() {
    const [rows] = await pool.execute('SELECT * FROM acciones');
    return rows;
  }

  static async buscarAccionPorId(id_accion) {
    const [rows] = await pool.execute('SELECT * FROM acciones WHERE id_accion = ?', [id_accion]);
    return rows[0] || null;
  }

  static async obtenerOCrearPortafolio(id_usuario) {
    let [rows] = await pool.execute('SELECT * FROM portafolios WHERE id_usuario = ?', [id_usuario]);
    if (rows.length === 0) {
      const [result] = await pool.execute('INSERT INTO portafolios (id_usuario) VALUES (?)', [id_usuario]);
      return result.insertId;
    }
    return rows[0].id_portafolio;
  }

  static async buscarPosicion(id_portafolio, id_accion) {
    const [rows] = await pool.execute(
      'SELECT * FROM posiciones_acciones WHERE id_portafolio = ? AND id_accion = ?',
      [id_portafolio, id_accion]
    );
    return rows[0] || null;
  }

  static async guardarPosicion(id_portafolio, id_accion, cantidad, precioCompra) {
    const query = `
      INSERT INTO posiciones_acciones (id_portafolio, id_accion, cantidad_acciones, precio_promedio_compra)
      VALUES (?, ?, ?, ?)
    `;
    await pool.execute(query, [id_portafolio, id_accion, cantidad, precioCompra]);
  }

  static async actualizarPosicion(id_posicion, nuevaCantidad, nuevoPrecioPromedio) {
    await pool.execute(
      'UPDATE posiciones_acciones SET cantidad_acciones = ?, precio_promedio_compra = ? WHERE id_posicion = ?',
      [nuevaCantidad, nuevoPrecioPromedio, id_posicion]
    );
  }

  static async eliminarPosicion(id_posicion) {
    await pool.execute('DELETE FROM posiciones_acciones WHERE id_posicion = ?', [id_posicion]);
  }
}

module.exports = RepositorioBursatil;