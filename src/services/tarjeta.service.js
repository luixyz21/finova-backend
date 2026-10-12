const Tarjeta = require('../models/tarjeta.model');
const RepositorioTarjeta = require('../repositories/tarjeta.repository');
const GeneradorTarjeta = require('../config/generadorTarjeta');

class ServicioTarjeta {
  static async generarTarjeta({ id_cuenta, tipo }) {
    if (!id_cuenta || !tipo) {
      throw new Error('El ID de la cuenta y el tipo de tarjeta son obligatorios');
    }

    if (!['FIJA', 'TEMPORAL'].includes(tipo.toUpperCase())) {
      throw new Error('El tipo de tarjeta debe ser FIJA o TEMPORAL');
    }

    // Verificar existencia de la cuenta
    const [rows] = await require('../config/database').execute(
      'SELECT * FROM cuentas_bancarias WHERE id_cuenta = ?',
      [id_cuenta]
    );
    if (rows.length === 0) {
      throw new Error('La cuenta bancaria asociada no existe');
    }

    // Generar credenciales de tarjeta
    const datosGenerados = GeneradorTarjeta.generarDatosTarjeta();

    const nuevaTarjeta = new Tarjeta({
      id_cuenta,
      numero_tarjeta: datosGenerados.numero_tarjeta,
      fecha_vencimiento: datosGenerados.fecha_vencimiento,
      cvv: datosGenerados.cvv,
      tipo: tipo.toUpperCase(),
      estado: 'ACTIVA'
    });

    const idTarjeta = await RepositorioTarjeta.guardar(nuevaTarjeta);

    return {
      id_tarjeta: idTarjeta,
      numero_tarjeta: nuevaTarjeta.numero_tarjeta,
      fecha_vencimiento: nuevaTarjeta.fecha_vencimiento,
      cvv: nuevaTarjeta.cvv,
      tipo: nuevaTarjeta.tipo,
      estado: nuevaTarjeta.estado
    };
  }

  static async obtenerPorCuenta(id_cuenta) {
    return await RepositorioTarjeta.buscarPorIdCuenta(id_cuenta);
  }

  static async destruirTarjetaTemporal(id_tarjeta) {
    const tarjeta = await RepositorioTarjeta.buscarPorId(id_tarjeta);
    if (!tarjeta) {
      throw new Error('La tarjeta especificada no existe');
    }

    if (tarjeta.tipo !== 'TEMPORAL') {
      throw new Error('Solo las tarjetas temporales pueden ser destruidas a demanda');
    }

    await RepositorioTarjeta.cambiarEstado(id_tarjeta, 'DESTRUIDA');
    return { mensaje: 'Tarjeta temporal destruida exitosamente' };
  }
}

module.exports = ServicioTarjeta;