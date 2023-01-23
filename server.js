'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// mongoose.connect(process.env.DB_URL);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}


const db=mongoose.connection;
db.on('error',console.error.bind(console, 'connection error'));
db.once('open',function() {
  console.log('mongoose is connected');
});

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})



app.listen(PORT, () => console.log(`listening on ${PORT}`));
