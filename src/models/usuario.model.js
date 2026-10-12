class Usuario {
  constructor({ id_usuario, nombre, apellidos, cedula, correo, telefono, fecha_nacimiento, nombre_usuario, contrasena }) {
    this.id_usuario = id_usuario || null;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.cedula = cedula;
    this.correo = correo;
    this.telefono = telefono;
    this.fecha_nacimiento = fecha_nacimiento;
    this.nombre_usuario = nombre_usuario;
    this.contrasena = contrasena;
  }
}

module.exports = Usuario;