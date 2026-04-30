const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'inventario',
};

async function getConnection() {
  return mysql.createConnection(dbConfig);
}

// Health check — NO modificar, lo usa el pipeline de CI
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mini-inventario-api' });
});

// GET /productos — Devuelve todos los productos
app.get('/productos', async (req, res) => {
  // TODO: consultar todos los productos y devolver el array en JSON
});

// GET /productos/:id — Devuelve un producto por ID
app.get('/productos/:id', async (req, res) => {
  // TODO: consultar un producto por id
  // Si no existe, responder con status 404 y { error: 'Producto no encontrado' }
});

// POST /productos — Crea un nuevo producto
app.post('/productos', async (req, res) => {
  // TODO: insertar el producto recibido en req.body
  // Campos requeridos: nombre, cantidad, precio
  // Si falta alguno, responder 400 con { error: 'Faltan campos requeridos' }
  // Al crear exitosamente, responder 201 con el producto creado (incluyendo su id)
});

// PUT /productos/:id/stock — Actualiza solo la cantidad en stock
app.put('/productos/:id/stock', async (req, res) => {
  // TODO: actualizar el campo cantidad del producto con el id dado
  // El nuevo valor llega en req.body.cantidad
  // Si el producto no existe, responder 404
});

// DELETE /productos/:id — Elimina un producto
app.delete('/productos/:id', async (req, res) => {
  // TODO: eliminar el producto con el id dado
  // Si no existe, responder 404
  // Al eliminar exitosamente, responder 200 con { mensaje: 'Producto eliminado' }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API de inventario corriendo en puerto ${PORT}`);
});