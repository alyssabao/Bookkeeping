const Book = require("../models/book")

exports.createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body); // all the fields from req.body will go in here
    await newBook.save();
    res.status(201).json({ status: "success", data: newBook });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message })
  }
};

exports.readBook = async (req, res, next) => {
  try {
    const allBooks = await Book.find({})
    res.json({
      status: "success",
      data: allBooks
    })
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message
    })
  }
}

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      throw new Error("No such book exists.")
    }
    const fields = Object.keys(req.body);
    fields.map(field => book[field] = req.body[field]);
    await book.save()
    res.json({
      status: "success",
      data: book
    })
    next();
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message
    })
  }
}