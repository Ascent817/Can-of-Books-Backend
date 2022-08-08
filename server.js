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

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongoose connected.');
});

app.get('/ping', (request, response) => {
  response.send('Ping successful.');
})

app.get('/books', GetBooks)

async function GetBooks(request, response, next) {
  try {
    let data = await Book.find();
    response.status(200).send(data);
  } catch (error) {
    next(error);
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));