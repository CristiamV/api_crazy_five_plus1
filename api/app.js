const cors = require('cors')
const morgan = require('morgan');

const express = require('express');
const app = express();

const users = require('./routes/users');
const categories = require('./routes/categories');

app.disable('x-powered-by');

app.use(cors({
    origin: '*',
}));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('combined'));

app.get('/', (_req, res) => {
  res.send('api running port 9021!').sendStatus(200);
});

app.use('/users', users);
app.use('/categories', categories);

module.exports = app;
