const routes = require('express').Router();
const connect = require('../db/connect')

routes.get('/', (req, res) => {   
    connect.getCollection().find().toArray(function(err, result){
        if (err) throw err;
        res.json(result);
        console.log('we got the contacts query successfully')
    });
});

module.exports = routes;