// Web framework
const express = require('express')
// Template language
const nunjucks = require('nunjucks')
// For connecting to MongoDB
const mongoose = require('mongoose')
// Used to read the data which comes in a request
const bodyParser = require('body-parser');

// Getting models
const Book = require(__dirname + '/models/Book')

// Turn on Express
let server = express()

// Set up Nunjucks
nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  express: server
});

// Connect to DB
mongoose.connect('mongodb+srv://dbUser:EGBYtw0u2p11vKRM@cluster0-exgpc.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true}, function(err){
  if(err) return console.log(err);
  console.log("DB connection opened");
})

// Setting up body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// A route
server.get('/', function(req, res){
  res.render('index.njk', {
    currentYear: 2020
  })
})

// Form to add new book
server.get("/book/new", function(req, res){
  res.render('book_form.njk')
})

// New book (post)
server.post("/book/new", function(req, res){
  console.log(req.body)
  let book = new Book({ title: req.body.title });
  book.save()
  res.render('index.njk')
})

// View all books
server.get("/book/list", function(req, res){
    Book.find({}, function (err, callback) {
        // for(let i=0; callback.length; i++){
        //     console.log(callback[i]);
        //     // console.log(callback[i].title);
        // };
        console.log(callback)
        res.render('list.njk', {
            books: callback
        })
    });

})

server.use(express.static(__dirname + '/static'))

server.listen(3000, function(){
    console.log("Server is running")
})

