const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const express = require("express")

mongoose.connect(process.env.DB, { 
  // some options to deal with deprecated warning, you don't have to worry about them.
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useUnifiedTopology: true 
  })
  .then(()=> console.log("connected to database"))

const bodyParser = require('body-parser')
// ... 
const app = express();
const router = express.Router();
const {createUser,readUser,updateUser} = require("./controllers/userController")
const {createBook,readBook,updateBook} = require("./controllers/bookController")
const {createGenre,readGenre,updateGenre} = require("./controllers/genreController")
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// use router
app.use(router);  

router
.route("/")
.post(createUser)
.get(readUser)

router
.route("/user/:id")
.put(updateUser)

router
.route("/book")
.post(createBook)
.get(readBook)

router
.route("/book/:id")
.put(updateBook)

router
.route("/genre")
.post(createGenre)
.get(readGenre)

router
.route("/genre/:id")
.put(updateGenre)

app.listen(process.env.PORT, () =>
console.log("server running on " + process.env.PORT)
);
