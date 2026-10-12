const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Inicialización de Express
const usuarioRoutes = require('./routes/usuario.routes');
const cuentaRoutes = require('./routes/cuenta.routes');
const sobreRoutes = require('./routes/sobre.routes');
const tarjetaRoutes = require('./routes/tarjeta.routes');
const servicioRoutes = require('./routes/servicioPublico.routes');
const creditoRoutes = require('./routes/credito.routes');
const bursatilRoutes = require('./routes/bursatil.routes');

const app = express();

// Middlewares globales
app.use(cors()); // Permite peticiones desde jQuery / Front-end
app.use(express.json()); // Permite procesar bodies en formato JSON
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cuentas', cuentaRoutes);
app.use('/api/sobres', sobreRoutes);
app.use('/api/tarjetas', tarjetaRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/creditos', creditoRoutes);
app.use('/api/bursatil', bursatilRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API de FiNova ejecutándose correctamente' });
});

// Puerto de ejecución
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;