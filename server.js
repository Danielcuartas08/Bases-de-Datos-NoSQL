// server.js
const express = require('express');
const mongoose = require('mongoose');
const Cliente = require('./models/Cliente'); // Modelo
const app = express();

// Middleware para JSON y archivos estáticos
app.use(express.json());
app.use(express.static('public'));

// Conexión a MongoDB (ajusta si usas Atlas)
mongoose.connect('mongodb://localhost/clientesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('🟢 Conectado a MongoDB'))
  .catch(err => console.error('❌ Error en conexión:', err));

// Crear cliente
app.post('/clientes', async (req, res) => {
  try {
    const nuevo = new Cliente(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Leer todos los clientes
app.get('/clientes', async (req, res) => {
  try {
    const lista = await Cliente.find();
    res.json(lista);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Actualizar por id
app.put('/clientes/:id', async (req, res) => {
  try {
    const actualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Eliminar por id
app.delete('/clientes/:id', async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Eliminado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Inicia el servidor
app.listen(3000, () => console.log('Servidor MongoDB corriendo en http://localhost:3000'));
