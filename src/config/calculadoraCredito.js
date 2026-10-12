class CalculadoraCredito {
  static calcularCuotaMensual(monto, plazoMeses, tasaAnual = 10.00) {
    const tasaMensualDecimal = (tasaAnual / 12) / 100;
    const amortizacionCapital = monto / plazoMeses;
    const interesMensual = monto * tasaMensualDecimal;
    const cuota = amortizacionCapital + interesMensual;
    return Number(cuota.toFixed(2));
  }
}

module.exports = CalculadoraCredito;