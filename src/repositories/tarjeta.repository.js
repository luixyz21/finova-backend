const pool = require('../config/database');

class RepositorioTarjeta {
  static async guardar(tarjeta) {
    const query = `
      INSERT INTO tarjetas (id_cuenta, numero_tarjeta, fecha_vencimiento, cvv, tipo, estado)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      tarjeta.id_cuenta,
      tarjeta.numero_tarjeta,
      tarjeta.fecha_vencimiento,
      tarjeta.cvv,
      tarjeta.tipo,
      tarjeta.estado
    ];
    const [result] = await pool.execute(query, values);
    return result.insertId;
  }

  static async buscarPorIdCuenta(id_cuenta) {
    const [rows] = await pool.execute(
      'SELECT * FROM tarjetas WHERE id_cuenta = ? AND estado = "ACTIVA"',
      [id_cuenta]
    );
    return rows;
  }

  static async buscarPorId(id_tarjeta) {
    const [rows] = await pool.execute('SELECT * FROM tarjetas WHERE id_tarjeta = ?', [id_tarjeta]);
    return rows[0] || null;
  }

  static async cambiarEstado(id_tarjeta, nuevoEstado) {
    await pool.execute('UPDATE tarjetas SET estado = ? WHERE id_tarjeta = ?', [nuevoEstado, id_tarjeta]);
  }
}

module.exports = RepositorioTarjeta;