const express = require('express');
const router = express.Router();
const authController = require('./controllers/authenticationController');
const authMiddleware = require('./middlewares/authMiddleware');

// Login
router.post('/login', authController.login);

// Rota protegida
router.get('/pedidos', authMiddleware, (req, res) => {
  res.json({ mensagem: `Bem-vindo, usuário ${req.usuario.email}` });
});

module.exports = router;
