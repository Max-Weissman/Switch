const express = require('express');
const app = express();
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser');
const db = require('./db');

db.sync().then(() => console.log('Database is synced'));

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './path/to/index.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './path/to/index.html'));
});

const port = process.env.PORT || 8080; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});