const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');

routes.use(bodyParser.json());

routes.get('/', (req, res) => {
  const results = connect.getCollection().find();
  results.toArray().then((documents) => {
    res.status(200).json(documents);
    console.log('returned all contacts');
  });
});

routes.get('/:id', (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const results = connect.getCollection().find({ _id: contactId });
  results.toArray().then((documents) => {
    res.status(200).json(documents[0]);
    console.log(`returned one contact with id ${req.params.id}`);
  });
});

//Week 3

routes.post('/', async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await connect.getCollection().insertOne(contact);
  console.log('successfully inserted one!');
  console.log(response);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
});

routes.put('/:id', async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  let contact = {};
  if (req.body.firstName) {
    contact.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    contact.lastName = req.body.lastName;
  }
  if (req.body.email) {
    contact.email = req.body.email;
  }
  if (req.body.favoriteColor) {
    contact.favoriteColor = req.body.favoriteColor;
  }
  if (req.body.birthday) {
    contact.birthday = req.body.birthday;
  }
  const response = await connect.getCollection().updateOne({ _id: contactId }, { $set: contact });
  console.log(response);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
});

routes.delete('/:id', async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const response = await connect.getCollection().deleteOne({ _id: contactId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
});

module.exports = routes;
