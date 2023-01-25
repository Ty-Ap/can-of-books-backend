'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book.js')

mongoose.connect(process.env.DB_URL);





const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {

  response.status(200).send('Welcome!')

})

app.get('/books', getBooks);

async function getBooks(request, response, next){
  try {
    let allBooks = await Book.find({});

    response.status(200).send(allBooks);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.delete('/books/:bookID', deleteBooks);

async function deleteBooks(request,response,next){
  try {
    let id = request.params.bookID;

    await Book.findByIdAndDelete(id);
    response.status(200).send('Book deleted');
  } catch (error) {
    console.long(error.message);
    next(error);
  }
}

app.post('/books', postBook);

async function postBook(request,response,next){
  try {
    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook)
    
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


app.put('/books/:bookID', updateBook);

async function updateBook(request, response, next){
  try {
    let id = request.params.bookID;
    let data = request.body;

    const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true });

    response.status(200).send(updatedBook);


  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.get('*', (request,response) => {
  response.status(404).send('not available');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
