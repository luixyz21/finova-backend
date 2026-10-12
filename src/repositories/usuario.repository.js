const pool = require('../config/database');

class RepositorioUsuario {
  static async buscarPorNombreUsuario(nombre_usuario) {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
    return rows[0] || null;
  }

  static async buscarPorCorreo(correo) {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return rows[0] || null;
  }

  static async buscarPorCedula(cedula) {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE cedula = ?', [cedula]);
    return rows[0] || null;
  }

  static async guardar(usuario) {
    const query = `
      INSERT INTO usuarios (nombre, apellidos, cedula, correo, telefono, fecha_nacimiento, nombre_usuario, contrasena)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      usuario.nombre,
      usuario.apellidos,
      usuario.cedula,
      usuario.correo,
      usuario.telefono,
      usuario.fecha_nacimiento,
      usuario.nombre_usuario,
      usuario.contrasena
    ];

    const [result] = await pool.execute(query, values);
    return result.insertId;
  }
}

module.exports = RepositorioUsuario;