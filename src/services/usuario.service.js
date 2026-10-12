const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const ValidadorUsuario = require('../validators/usuario.validator');
const RepositorioUsuario = require('../repositories/usuario.repository');

class ServicioUsuario {
  static async registrar(datosRegistro) {
    // 1. Validar formato
    ValidadorUsuario.validarFormatoRegistro(datosRegistro);

    // 2. Verificar duplicados en BD
    if (await RepositorioUsuario.buscarPorNombreUsuario(datosRegistro.nombre_usuario)) {
      throw new Error('El nombre de usuario ya está registrado');
    }
    if (await RepositorioUsuario.buscarPorCorreo(datosRegistro.correo)) {
      throw new Error('El correo electrónico ya está registrado');
    }
    if (await RepositorioUsuario.buscarPorCedula(datosRegistro.cedula)) {
      throw new Error('La cédula ingresada ya está registrada');
    }

    // 3. Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasenaHash = await bcrypt.hash(datosRegistro.contrasena, salt);

    // 4. Instanciar Entidad y Guardar
    const nuevoUsuario = new Usuario({
      ...datosRegistro,
      contrasena: contrasenaHash
    });

    const idUsuario = await RepositorioUsuario.guardar(nuevoUsuario);
    return { id_usuario: idUsuario, nombre_usuario: nuevoUsuario.nombre_usuario, nombre: nuevoUsuario.nombre };
  }

  static async iniciarSesion(nombre_usuario, contrasena) {
    // 1. Validar campos
    ValidadorUsuario.validarFormatoLogin(nombre_usuario, contrasena);

    // 2. Buscar usuario
    const usuarioBD = await RepositorioUsuario.buscarPorNombreUsuario(nombre_usuario);
    if (!usuarioBD) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // 3. Comparar contraseña encriptada
    const coincide = await bcrypt.compare(contrasena, usuarioBD.contrasena);
    if (!coincide) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Retornar datos públicos del usuario (sin contraseña)
    return {
      id_usuario: usuarioBD.id_usuario,
      nombre: usuarioBD.nombre,
      apellidos: usuarioBD.apellidos,
      nombre_usuario: usuarioBD.nombre_usuario,
      correo: usuarioBD.correo
    };
  }
}

module.exports = ServicioUsuario;