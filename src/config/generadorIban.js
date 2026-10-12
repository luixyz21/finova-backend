class GeneradorIBAN {
  static generarIbanCostaRica() {
    // Estructura IBAN Costa Rica: CR + 2 dígitos de control + 18 dígitos de cuenta
    const banco = '050152'; // Código entidad FiNova
    const aleatorio = Math.floor(10000000000000 + Math.random() * 90000000000000);
    return `CR05${banco}${aleatorio}`;
  }
}

module.exports = GeneradorIBAN;