const express = require('express');
const { login } = require('../controllers/authenticationController');
const router = express.Router();

// Rota para login
router.post('/login', login);
const jwt = require('jsonwebtoken');

// Após verificar que o email/senha estão corretos...
const token = jwt.sign(
  { id: usuario.id }, // <-- Aqui você insere o ID
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

module.exports = router;