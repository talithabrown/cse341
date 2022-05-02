const express = require('express');
const app =  express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Brayan Garcia')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


//ugly code

const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(process.env.MONGODB_URI, function(err, db){
    if (err) throw err;
    var dbo = db.db("contacts");
    dbo.collection("contacts").find().toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        db.close()
    })
 })