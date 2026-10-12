const pool = require('../config/database');

class RepositorioMovimiento {
  // 1. Registrar cualquier tipo de transacción
  static async registrar({ id_cuenta_origen, id_cuenta_destino, id_sobre, monto, tipo_movimiento, detalle }) {
    const query = `
      INSERT INTO movimientos (id_cuenta_origen, id_cuenta_destino, id_sobre, monto, tipo_movimiento, detalle)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      id_cuenta_origen || null,
      id_cuenta_destino || null,
      id_sobre || null,
      monto,
      tipo_movimiento,
      detalle
    ]);
    return result.insertId;
  }
  // 2. Obtener todos los movimientos de una cuenta bancaria
  static async obtenerPorCuenta(id_cuenta) {
    const query = `
      SELECT * FROM movimientos 
      WHERE id_cuenta_origen = ? OR id_cuenta_destino = ? 
      ORDER BY fecha DESC
    `;
    const [rows] = await pool.execute(query, [id_cuenta, id_cuenta]);
    return rows;
  }

  // 3. Obtener movimientos exclusivos de un sobre (Cargas/Descargas)
  static async obtenerPorSobre(id_sobre) {
    const query = `
      SELECT * FROM movimientos 
      WHERE id_sobre = ? 
      ORDER BY fecha DESC
    `;
    const [rows] = await pool.execute(query, [id_sobre]);
    return rows;
  }
  // 4. Obtener ultimos 'N' movimientos para el Dashboard principal
  static async obtenerRecientesPorUsuario(id_usuario, limite = 5) {
    const query = `
      SELECT m.* 
      FROM movimientos m
      INNER JOIN cuentas_bancarias c ON (m.id_cuenta_origen = c.id_cuenta OR m.id_cuenta_destino = c.id_cuenta)
      WHERE c.id_usuario = ?
      ORDER BY m.fecha DESC
      LIMIT ?
    `;
    const [rows] = await pool.execute(query, [id_usuario, limite]);
    return rows;
  }

  // 5. Filtrar movimientos por tipo (ej: ver solo PAGO_SERVICIO o TRANSFERENCIA)
  static async obtenerPorTipo(id_cuenta, tipo_movimiento) {
    const query = `
      SELECT * FROM movimientos 
      WHERE (id_cuenta_origen = ? OR id_cuenta_destino = ?) 
        AND tipo_movimiento = ?
      ORDER BY fecha DESC
    `;
    const [rows] = await pool.execute(query, [id_cuenta, id_cuenta, tipo_movimiento]);
    return rows;
  }
}

module.exports = RepositorioMovimiento;