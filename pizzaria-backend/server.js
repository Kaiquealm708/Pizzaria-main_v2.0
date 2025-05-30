require('dotenv').config({ path: '.env.backend' });
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./src/routes/users');
const authenticationRouter = require('./src/routes/authentication');
const app = express();

const PORT = process.env.PORT || 3002;

// Habilitar o parsing de JSON no corpo da requisição
app.use(express.json());

// Configuração de CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// teste

require('dotenv').config();

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Deve mostrar: suachavesecreta123

// Rotas
app.use('/api/users', usersRoutes);
app.use('/api/authentication', authenticationRouter);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
