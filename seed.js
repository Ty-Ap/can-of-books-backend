'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {
  // title: {type: String, required: true},
  // description: {type: String, required: true},
  // status: {type: Boolean, required: true},

  await Book.create({
    title: 'The Neverending Story', 
    description: 'A neverending story',
    status: true,
  });

  console.log('NO ARTAX, YOUVE GOTTA GET UP');

  await Book.create({
    title: 'Moby Dick',
    description: 'hunting a whale',
    status: true,
  });

  console.log('TOWARDS THEE I ROLL. THOU ALL-DESTROYING BUT UNCONQUERING WHALE; TO THE LAST I GRAPPLE WITH THEE;FROM HELLS HEART I STAB AT THEE, ');

  await Book.create({
    title: '20,000 Leagues Under the Sea',
    description: 'we going deep',
    status: true,
  });
  
  console.log('We must brave human laws, but we cannot resist natural ones');

  await Book.create({
    title: 'the Dark Tower',
    description: 'go then, there are other worlds than these.',
    status: true,
  })

  console.log('idk, its a tower and its dark. i didnt read this one');

  mongoose.disconnect();
}

seed();