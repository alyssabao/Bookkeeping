const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Title is required!"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    trim: true
  },
  publicationYear: {
    type: Number,
  },
  author: Object,
  genres: Array
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
