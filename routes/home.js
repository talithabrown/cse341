const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hello! You are home :)');
});

module.exports = routes;
