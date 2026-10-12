class GeneradorTarjeta {
  static generarDatosTarjeta() {
    // BIN ficticio para FiNova: 4000 12xx xxxx xxxx
    const bin = '400012';
    const aleatorio = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const numero_tarjeta = `${bin}${aleatorio}`;

    // Fecha de vencimiento (+3 años)
    const hoy = new Date();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const anio = String((hoy.getFullYear() + 3) % 100).padStart(2, '0');
    const fecha_vencimiento = `${mes}/${anio}`;

    // CVV aleatorio de 3 dígitos
    const cvv = Math.floor(100 + Math.random() * 900).toString();

    return { numero_tarjeta, fecha_vencimiento, cvv };
  }
}

module.exports = GeneradorTarjeta;