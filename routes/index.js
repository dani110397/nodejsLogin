const express = require('express');
const router = express.Router();

// Startseite
router.get('/', (req, res) => {
  res.render('index');
});

// Dashboard (geschützte Route)
router.get('*', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  res.render(req.path.substring(1,req.path.length));
});

module.exports = router;
