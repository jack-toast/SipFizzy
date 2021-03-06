// base router for api
const routes = require('express').Router();

const drinks = require('./drinks');
const reviews = require('./reviews');
const users = require('./users');

routes.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Connected!',
  });
});

routes.use('/drinks', drinks);
routes.use('/reviews', reviews);
routes.use('/', users);

module.exports = routes;
