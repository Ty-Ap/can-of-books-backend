'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book.js')

// mongoose.connect(process.env.DB_URL);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('mongoose is connected');
});

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;


app.get('/books', getBooks);

async function getBooks(request, response, next){
  try {
    let allBooks = await Book.find({});

    response.status(200).send(allBooks);

  } catch (error) {
    console.log(error);
    next(error);
  }
}

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('*', (request,response) => {
  response.status(404).send('not available');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
