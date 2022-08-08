const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {type: String, require: true},
  description:{type: String, require: true},
  status:{type: String, require: true}
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;