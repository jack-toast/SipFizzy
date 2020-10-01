// base router for api
const routes = require('express').Router();

const drinks = require('./drinks');
const users = require('./users');

routes.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Connected!',
  });
});

routes.use('/drinks', drinks);
routes.use('/users', users);

module.exports = routes;
