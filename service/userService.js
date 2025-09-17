// service/userService.js
const { users } = require('../model/db');

function registerUser(username, password, favorecido) {
  if (!username || !password) return { error: 'Usuário e senha obrigatórios' };
  if (users.find(u => u.username === username)) return { error: 'Usuário já existe' };
  const user = { username, password, favorecido: !!favorecido };
  users.push(user);
  return { user };
}

function loginUser(username, password) {
  if (!username || !password) return { error: 'Usuário e senha obrigatórios' };
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return { error: 'Credenciais inválidas' };
  return { user };
}

function getAllUsers() {
  return users.map(u => ({ username: u.username, favorecido: u.favorecido }));
}

module.exports = { registerUser, loginUser, getAllUsers };
