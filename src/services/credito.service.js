const Credito = require('../models/credito.model');
const RepositorioCredito = require('../repositories/credito.repository');
const RepositorioCuentaBancaria = require('../repositories/cuenta.repository');
const RepositorioMovimiento = require('../repositories/movimiento.repository');
const ValidadorCredito = require('../validators/credito.validator');
const CalculadoraCredito = require('../config/calculadoraCredito');
const pool = require('../config/database');

class ServicioCredito {
  static async solicitarCredito({ id_cuenta_deposito, monto_solicitado, plazo_meses }) {
    // 1. Validar parámetros
    ValidadorCredito.validarSolicitud({ id_cuenta_deposito, monto_solicitado, plazo_meses });

    // 2. Verificar existencia de la cuenta bancaria
    const [rows] = await pool.execute('SELECT * FROM cuentas_bancarias WHERE id_cuenta = ?', [id_cuenta_deposito]);
    const cuenta = rows[0];

    if (!cuenta) {
      throw new Error('La cuenta bancaria para el depósito del crédito no existe');
    }

    // 3. Calcular cuota mensual
    const tasaAnual = 10.00;
    const cuotaEstimada = CalculadoraCredito.calcularCuotaMensual(monto_solicitado, plazo_meses, tasaAnual);

    // 4. Instanciar Entidad y Guardar Crédito
    const nuevoCredito = new Credito({
      id_cuenta_deposito,
      monto_solicitado,
      tasa_interes_anual: tasaAnual,
      plazo_meses,
      cuota_estimada: cuotaEstimada
    });

    const idCredito = await RepositorioCredito.guardar(nuevoCredito);

    // 5. Acreditar desembolso al saldo de la cuenta
    const nuevoSaldo = Number(cuenta.saldo) + Number(monto_solicitado);
    await RepositorioCuentaBancaria.actualizarSaldo(id_cuenta_deposito, nuevoSaldo);

    // 6. Registrar en auditoría de movimientos
    await RepositorioMovimiento.registrar({
      id_cuenta_destino: id_cuenta_deposito,
      monto: monto_solicitado,
      tipo_movimiento: 'CREDITO',
      detalle: `Desembolso de Crédito Aprobado #${idCredito}`
    });

    return {
      id_credito: idCredito,
      monto_desembolsado: monto_solicitado,
      plazo_meses,
      cuota_mensual: cuotaEstimada,
      nuevo_saldo_cuenta: nuevoSaldo
    };
  }
}

module.exports = ServicioCredito;