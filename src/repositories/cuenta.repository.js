const pool = require('../config/database');

class RepositorioCuentaBancaria {
  static async guardar(cuenta) {
    const query = `
      INSERT INTO cuentas_bancarias (id_usuario, iban, tipo_cuenta, saldo, moneda, tiene_sobres)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [cuenta.id_usuario, cuenta.iban, cuenta.tipo_cuenta, cuenta.saldo, cuenta.moneda, cuenta.tiene_sobres];
    const [result] = await pool.execute(query, values);
    return result.insertId;
  }

  static async buscarPorIdUsuario(id_usuario) {
    const [rows] = await pool.execute('SELECT * FROM cuentas_bancarias WHERE id_usuario = ?', [id_usuario]);
    return rows;
  }

  static async buscarPorIban(iban) {
    const [rows] = await pool.execute('SELECT * FROM cuentas_bancarias WHERE iban = ?', [iban]);
    return rows[0] || null;
  }

  static async actualizarSaldo(id_cuenta, nuevoSaldo) {
    await pool.execute('UPDATE cuentas_bancarias SET saldo = ? WHERE id_cuenta = ?', [nuevoSaldo, id_cuenta]);
  }
}

module.exports = RepositorioCuentaBancaria;