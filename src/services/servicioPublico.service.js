const RepositorioServicioPublico = require('../repositories/servicioPublico.repository');
const RepositorioCuentaBancaria = require('../repositories/cuenta.repository');
const RepositorioMovimiento = require('../repositories/movimiento.repository');
const ValidadorServicioPublico = require('../validators/servicioPublico.validator');
const pool = require('../config/database');

class ServicioPagoServicios {
  static async listarServicios() {
    return await RepositorioServicioPublico.obtenerTodos();
  }

  // Simulación de consulta de recibo/factura por NISE
  static async consultarFactura(id_servicio, nise) {
    const servicio = await RepositorioServicioPublico.buscarPorId(id_servicio);
    if (!servicio) {
      throw new Error('El servicio público consultado no existe');
    }

    // Simula una factura pendiente de cobro
    return {
      id_servicio: servicio.id_servicio,
      servicio: servicio.nombre_servicio,
      nise,
      titular: 'Luis Rodríguez',
      monto_pendiente: 24500.00,
      fecha_vencimiento: '2026-10-25'
    };
  }

  static async pagarServicio({ id_cuenta, id_servicio, nise, monto }) {
    // 1. Obtener la cuenta bancaria origen
    const [rows] = await pool.execute('SELECT * FROM cuentas_bancarias WHERE id_cuenta = ?', [id_cuenta]);
    const cuenta = rows[0];

    if (!cuenta) {
      throw new Error('La cuenta bancaria seleccionada no existe');
    }

    // 2. Validar disponibilidad de saldo
    ValidadorServicioPublico.validarPago({ id_cuenta, id_servicio, nise, monto }, Number(cuenta.saldo));

    // 3. Obtener datos del servicio
    const servicio = await RepositorioServicioPublico.buscarPorId(id_servicio);

    // 4. Debitar saldo de la cuenta
    const nuevoSaldo = Number(cuenta.saldo) - Number(monto);
    await RepositorioCuentaBancaria.actualizarSaldo(id_cuenta, nuevoSaldo);

    // 5. Registrar movimiento de auditoría central
    const idMovimiento = await RepositorioMovimiento.registrar({
      id_cuenta_origen: id_cuenta,
      monto,
      tipo_movimiento: 'PAGO_SERVICIO',
      detalle: `Pago de ${servicio ? servicio.nombre_servicio : 'Servicio'} - NISE: ${nise}`
    });

    return {
      id_movimiento: idMovimiento,
      servicio: servicio ? servicio.nombre_servicio : 'Servicio Público',
      nise,
      monto_pagado: monto,
      nuevo_saldo_cuenta: nuevoSaldo
    };
  }
}

module.exports = ServicioPagoServicios;