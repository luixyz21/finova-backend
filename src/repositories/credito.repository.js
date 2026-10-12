const pool = require('../config/database');

class RepositorioCredito {
  static async guardar(credito) {
    const query = `
      INSERT INTO creditos (id_cuenta_deposito, monto_solicitado, tasa_interes_anual, plazo_meses, cuota_estimada)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      credito.id_cuenta_deposito,
      credito.monto_solicitado,
      credito.tasa_interes_anual,
      credito.plazo_meses,
      credito.cuota_estimada
    ];
    const [result] = await pool.execute(query, values);
    return result.insertId;
  }

  static async obtenerPorCuenta(id_cuenta_deposito) {
    const [rows] = await pool.execute('SELECT * FROM creditos WHERE id_cuenta_deposito = ?', [id_cuenta_deposito]);
    return rows;
  }
}

module.exports = RepositorioCredito;