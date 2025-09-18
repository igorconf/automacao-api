// service/transferService.js
const { users, transfers } = require('../model/db');

function transfer(from, to, amount) {
  if (!from || !to || typeof amount !== 'number') return { error: 'Dados obrigatórios' };
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) return { error: 'Usuário remetente ou destinatário não encontrado' };
  if (!recipient.favorecido && amount >= 5000) {
    return { error: 'Transferência acima de R$ 5.000,00 só para favorecidos' };
  }
  const transferObj = { from, to, amount, date: new Date() };
  transfers.push(transferObj);
  return { transfer: transferObj };
}

function getTransfers() {
  return transfers;
}

module.exports = { transfer, getTransfers };
