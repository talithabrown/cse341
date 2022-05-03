const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId

routes.get('/', (req, res) => {   

    const results = connect.getCollection().find();
    
    results.toArray().then((documents) => {
        res.status(200).json(documents);
        console.log('returned all contacts')
    });

});

routes.get('/:id', (req, res) => {   

    const contactId = new ObjectId(req.params.id);
    const results = connect.getCollection().find({_id: contactId});
    
    results.toArray().then((documents) => {
        res.status(200).json(documents[0]);
        console.log(`returned one contact with id ${req.params.id}`)
    });

});

module.exports = routes;