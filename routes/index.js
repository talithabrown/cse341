const routes = require('express').Router();

routes.use('/', require('./home'));
routes.use('/contacts', require('./contacts'));
routes.use('/', require('./swagger'));

module.exports = routes;
