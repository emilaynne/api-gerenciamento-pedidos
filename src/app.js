const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
app.use(express.json());
app.use(pedidoRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: "API de Gerenciamento de Pedidos rodando!" });
});

module.exports = app;