class ValidadorBursatil {
  static validarOperacion({ id_usuario, id_cuenta, id_accion, cantidad }) {
    if (!id_usuario || !id_cuenta || !id_accion || !cantidad) {
      throw new Error('El usuario, cuenta, acción y cantidad son obligatorios');
    }

    if (cantidad <= 0 || !Number.isInteger(Number(cantidad))) {
      throw new Error('La cantidad de acciones debe ser un número entero mayor a cero');
    }
  }

  static validarFondosCompra(saldoCuentaUSD, totalUSD) {
    if (saldoCuentaUSD < totalUSD) {
      throw new Error('Saldo insuficiente en la cuenta para realizar la compra de acciones');
    }
  }

  static validarPosicionVenta(posicionExistente, cantidadAVender) {
    if (!posicionExistente || posicionExistente.cantidad_acciones < cantidadAVender) {
      throw new Error('No posees suficientes acciones de esta empresa para realizar la venta');
    }
  }
}

module.exports = ValidadorBursatil;