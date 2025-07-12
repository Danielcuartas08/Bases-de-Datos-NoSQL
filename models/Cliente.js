// models/Cliente.js
const mongoose = require('mongoose');

// Define el esquema del cliente
const ClienteSchema = new mongoose.Schema({
  documento: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true}
});

// Exporta el modelo para usarlo en controles y rutas
module.exports = mongoose.model('Cliente', ClienteSchema);
