// controller/userController.js
const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

router.post('/register', (req, res) => {
  const { username, password, favorecido } = req.body;
  const result = userService.registerUser(username, password, favorecido);
  if (result.error) return res.status(400).json({ error: result.error });
  res.status(201).json(result.user);
});


const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const result = userService.loginUser(username, password);
  if (result.error) return res.status(401).json({ error: result.error });
  const token = jwt.sign({ username: result.user.username }, SECRET, { expiresIn: '1h' });
  res.json({ user: result.user, token });
});

router.get('/', (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
});

module.exports = router;
