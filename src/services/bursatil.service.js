const RepositorioBursatil = require('../repositories/bursatil.repository');
const RepositorioCuentaBancaria = require('../repositories/cuenta.repository');
const RepositorioMovimiento = require('../repositories/movimiento.repository');
const ValidadorBursatil = require('../validators/bursatil.validator');
const pool = require('../config/database');

class ServicioBursatil {
  static async obtenerCatalogo() {
    return await RepositorioBursatil.obtenerAcciones();
  }

  static async comprarAcciones({ id_usuario, id_cuenta, id_accion, cantidad }) {
    // 1. Validar parámetros básicos
    ValidadorBursatil.validarOperacion({ id_usuario, id_cuenta, id_accion, cantidad });

    // 2. Obtener la acción y la cuenta
    const accion = await RepositorioBursatil.buscarAccionPorId(id_accion);
    if (!accion) throw new Error('La acción seleccionada no existe');

    const [rowsCuenta] = await pool.execute('SELECT * FROM cuentas_bancarias WHERE id_cuenta = ?', [id_cuenta]);
    const cuenta = rowsCuenta[0];
    if (!cuenta) throw new Error('La cuenta bancaria no existe');

    // 3. Validar saldo suficiente
    const totalCompraUSD = Number(accion.precio_actual_usd) * Number(cantidad);
    ValidadorBursatil.validarFondosCompra(Number(cuenta.saldo), totalCompraUSD);

    // 4. Debitar cuenta
    const nuevoSaldo = Number(cuenta.saldo) - totalCompraUSD;
    await RepositorioCuentaBancaria.actualizarSaldo(id_cuenta, nuevoSaldo);

    // 5. Gestionar Portafolio y Posición
    const idPortafolio = await RepositorioBursatil.obtenerOCrearPortafolio(id_usuario);
    const posicionActual = await RepositorioBursatil.buscarPosicion(idPortafolio, id_accion);

    if (posicionActual) {
      const nuevaCantidad = Number(posicionActual.cantidad_acciones) + Number(cantidad);
      await RepositorioBursatil.actualizarPosicion(posicionActual.id_posicion, nuevaCantidad, accion.precio_actual_usd);
    } else {
      await RepositorioBursatil.guardarPosicion(idPortafolio, id_accion, cantidad, accion.precio_actual_usd);
    }

    // 6. Auditoría
    await RepositorioMovimiento.registrar({
      id_cuenta_origen: id_cuenta,
      monto: totalCompraUSD,
      tipo_movimiento: 'COMPRA_ACCION',
      detalle: `Compra de ${cantidad} acción(es) de ${accion.ticker}`
    });

    return {
      accion: accion.ticker,
      cantidad,
      monto_total_usd: totalCompraUSD,
      nuevo_saldo_cuenta: nuevoSaldo
    };
  }
}

module.exports = ServicioBursatil;