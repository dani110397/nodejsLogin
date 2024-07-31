const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { connectToDatabase } = require('./db/db');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: {
        maxAge: 30 * 60 * 1000 // 30 Minuten in Millisekunden
  }
}));

// Routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
app.use('/auth', authRoute);
app.use('/', indexRoute);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Datenbankverbindung herstellen und Server starten
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
