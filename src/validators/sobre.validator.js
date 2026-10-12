class ValidadorSobre {
  static validarCreacion(datos, saldoDisponibleCuenta) {
    const { id_cuenta, nombre, monto } = datos;

    if (!id_cuenta || !nombre || monto === undefined) {
      throw new Error('El ID de cuenta, el nombre y el monto inicial son obligatorios');
    }

    if (monto < 0) {
      throw new Error('El monto inicial del sobre no puede ser negativo');
    }

    if (monto > saldoDisponibleCuenta) {
      throw new Error('El saldo disponible en la cuenta bancaria es insuficiente para asignar este sobre');
    }
  }
}

module.exports = ValidadorSobre;