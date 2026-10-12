const pool = require('../config/database');

class RepositorioServicioPublico {
  static async obtenerTodos() {
    const [rows] = await pool.execute('SELECT * FROM servicios_publicos');
    return rows;
  }

  static async buscarPorId(id_servicio) {
    const [rows] = await pool.execute('SELECT * FROM servicios_publicos WHERE id_servicio = ?', [id_servicio]);
    return rows[0] || null;
  }
}

module.exports = RepositorioServicioPublico;