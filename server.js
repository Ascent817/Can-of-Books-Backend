require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;
const Book = require('./models/book.js');

app.use(cors());

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Mongoose connected.');
});

app.get('/', (request, response) => {
  response.send('Ping successful.');
});

app.get('/books', getBooks);
app.post('/books', postBooks);

async function getBooks(request, response, next) {
  try {
    let data = await Book.find();
    response.status(200).send(data);
  } catch (error) {
    next(error);
  }
}

async function postBooks(request, response, next) {
  console.log(request.body);
  try {
    let newBook = await Book.create(request.body);
    res.status(200).send(newBook);
  } catch (error) {
    next(error);
  }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));