const Sobre = require('../models/sobre.model');
const RepositorioSobre = require('../repositories/sobre.repository');
const RepositorioCuentaBancaria = require('../repositories/cuenta.repository');
const RepositorioMovimiento = require('../repositories/movimiento.repository');
const ValidadorSobre = require('../validators/sobre.validator');

class ServicioSobre {
  static async crearSobre({ id_cuenta, nombre, descripcion, monto }) {
    // 1. Consultar cuenta padre
    const cuentas = await RepositorioCuentaBancaria.buscarPorIdUsuario(id_cuenta); // O búsqueda por ID cuenta
    const [rows] = await require('../config/database').execute('SELECT * FROM cuentas_bancarias WHERE id_cuenta = ?', [id_cuenta]);
    const cuentaPadre = rows[0];

    if (!cuentaPadre) {
      throw new Error('La cuenta bancaria asociada no existe');
    }

    // 2. Validar
    ValidadorSobre.validarCreacion({ id_cuenta, nombre, monto }, Number(cuentaPadre.saldo));

    // 3. Debitar monto de la cuenta padre
    const nuevoSaldoCuenta = Number(cuentaPadre.saldo) - Number(monto);
    await RepositorioCuentaBancaria.actualizarSaldo(id_cuenta, nuevoSaldoCuenta);

    // 4. Guardar sobre
    const nuevoSobre = new Sobre({ id_cuenta, nombre, descripcion, monto });
    const idSobre = await RepositorioSobre.guardar(nuevoSobre);

    // 5. Actualizar bandera tiene_sobres
    await require('../config/database').execute('UPDATE cuentas_bancarias SET tiene_sobres = TRUE WHERE id_cuenta = ?', [id_cuenta]);

    // 6. Registrar movimiento de auditoría
    await RepositorioMovimiento.registrar({
      id_cuenta_origen: id_cuenta,
      id_sobre: idSobre,
      monto,
      tipo_movimiento: 'CARGA_SOBRE',
      detalle: `Asignación inicial a sobre: ${nombre}`
    });

    return { id_sobre: idSobre, nombre: nuevoSobre.nombre, monto: nuevoSobre.monto };
  }

  static async obtenerPorCuenta(id_cuenta) {
    return await RepositorioSobre.buscarPorIdCuenta(id_cuenta);
  }
}

module.exports = ServicioSobre;