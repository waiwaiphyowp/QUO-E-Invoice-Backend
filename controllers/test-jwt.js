const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/verify-token', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    res.json({ decoded });
  } catch (err) {
    res.status(401).json({ err: 'Invalid token.' });
  }
});

module.exports = router;