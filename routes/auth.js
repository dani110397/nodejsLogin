const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

// Login Form
router.get('/login', (req, res) => {
    if(req.session.userId){
        return res.redirect('/dashboard');
    }
    res.render('login');
});

// Login Process
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, async (err, user) => {
    if (err || !user) {
      return res.redirect('/auth/login');
    }

    let match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.userId = user.id;
      return res.redirect('/dashboard');
    } else {
      return res.redirect('/auth/login');
    }
  });
});

// Register Form
router.get('/register', (req, res) => {
  res.render('register');
});

// Register Process
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  User.create(username, password, (err) => {
    if (err) {
      return res.redirect('/auth/register');
    }
    res.redirect('/auth/login');
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
