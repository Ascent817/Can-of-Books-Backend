require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;
const Book = require('./models/book.js');

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Mongoose connected.');
});

app.get('/', (_request, response) => {
  response.send('Ping successful.');
});

app.get('/books', getBooks);
app.post('/books', postBooks);

async function getBooks(_request, response, next) {
  try {
    let data = await Book.find();
    response.status(200).send(data);
  } catch (error) {
    response.status(500).send(error);
  }
}

async function postBooks(request, response) {
  console.log('!!!!!!!',request.body);
  try {

    let newBook = await Book.create(request.body);
    response.status(200).send(newBook);
  } catch (error) {
    response.status(500).send(error);
  }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));