const express = require('express');
const bodyParser = require('body-parser');
//const res = require('express/lib/response');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./db/connect');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS']);
    next();
  })
  .use('/', require('./routes'));

connect.initDatabase();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//"cse341-backend2.herokuapp.com",
