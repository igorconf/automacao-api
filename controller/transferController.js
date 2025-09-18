// controller/transferController.js

const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, (req, res) => {
  const { from, to, amount } = req.body;
  try {
    const result = transferService.transfer(from, to, amount);
    if (result.error) return res.status(400).json({ error: result.error });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', authenticateToken, (req, res) => {
  try {
    const transfers = transferService.getTransfers();
    res.status(200).json(transfers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
