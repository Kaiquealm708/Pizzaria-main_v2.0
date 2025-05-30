// src/routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const autenticarToken = require('../middleware/authMiddleware');

const prisma = new PrismaClient();

// Criar usuário
router.post('/', async (req, res) => {
  const { nome, email, senha, telefone, endereco } = req.body;

  if (!nome || !email || !senha || !telefone || !endereco) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  try {
    const usuarioExistente = await prisma.user.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    await prisma.user.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        telefone,
        endereco,
      },
    });

    return res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});

// Obter dados do usuário autenticado
router.get('/', autenticarToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.usuarioId },
      select: {
        id: true,
        nome: true,
        email: true,
        balance: true,
      },
    });

    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar dados do usuário' });
  }
});

// Atualizar informações do usuário
router.put('/', autenticarToken, async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const senhaHash = senha
      ? await bcrypt.hash(senha, 10)
      : undefined;

    const dadosAtualizados = {
      ...(nome && { nome }),
      ...(senha && { senha: senhaHash }),
    };

    const userAtualizado = await prisma.user.update({
      where: { id: req.usuarioId },
      data: dadosAtualizados,
    });

    res.json(userAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
});

// Deletar usuário
router.delete('/', autenticarToken, async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.usuarioId },
    });

    res.json({ mensagem: 'Conta deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar conta' });
  }
});

module.exports = router;
