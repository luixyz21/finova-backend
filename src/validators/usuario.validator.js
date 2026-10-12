class ValidadorUsuario {
  static validarFormatoRegistro(datos) {
    const { nombre, apellidos, cedula, correo, nombre_usuario, contrasena, fecha_nacimiento } = datos;

    if (!nombre || !apellidos || !cedula || !correo || !nombre_usuario || !contrasena || !fecha_nacimiento) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      throw new Error('El formato del correo electrónico no es válido');
    }

    // Validar contraseña (> 8 caracteres, mayúscula, minúscula y número)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(contrasena)) {
      throw new Error('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y un número');
    }
  }

  static validarFormatoLogin(nombre_usuario, contrasena) {
    if (!nombre_usuario || !contrasena) {
      throw new Error('Debes ingresar tu usuario y contraseña');
    }
  }
}

module.exports = ValidadorUsuario;