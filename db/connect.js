//.env variables MONGODB_URI
const dotenv = require('dotenv');
dotenv.config();

//This is our database code
const MongoClient = require('mongodb').MongoClient;

let _client;
let _colliection;

const initDatabase = () => {
    MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
        if (err) throw err;
        _client = client;
        _colliection = client.db('contacts').collection("contacts");
        console.log('we are connected to our database!')
    });
};

const getCollection = () => {
    return _colliection;
};

module.exports = { initDatabase, getCollection }