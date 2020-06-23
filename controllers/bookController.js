exports.createBook = async (req, res) => {
    try {
      const newBook = new Book(req.body); // all the fields from req.body will go in here
      await newBook.save();
      res.status(201).json({ status: "success", data: newBook });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err.message })
    }
  };
  