const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Book must have a title!"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Book must have a description!"],
    trim: true
  },
  author: Object,
  genres: Array
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
