const pool = require('../config/database');

class RepositorioSobre {
  static async guardar(sobre) {
    const query = `
      INSERT INTO sobres (id_cuenta, nombre, descripcion, monto)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [sobre.id_cuenta, sobre.nombre, sobre.descripcion, sobre.monto]);
    return result.insertId;
  }

  static async buscarPorIdCuenta(id_cuenta) {
    const [rows] = await pool.execute('SELECT * FROM sobres WHERE id_cuenta = ?', [id_cuenta]);
    return rows;
  }

  static async buscarPorId(id_sobre) {
    const [rows] = await pool.execute('SELECT * FROM sobres WHERE id_sobre = ?', [id_sobre]);
    return rows[0] || null;
  }
}

module.exports = RepositorioSobre;