// controller/transferController.js
const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');

router.post('/', (req, res) => {
  const { from, to, amount } = req.body;
  const result = transferService.transfer(from, to, amount);
  if (result.error) return res.status(400).json({ error: result.error });
  res.status(201).json(result.transfer);
});

module.exports = router;
