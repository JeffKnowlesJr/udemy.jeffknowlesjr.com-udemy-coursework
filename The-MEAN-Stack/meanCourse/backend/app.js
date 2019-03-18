const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://Admin:bZzkjKZa93HlfXw1@cluster0-cc33y.mongodb.net/postDB?retryWrites=true', { useNewUrlParser: true }).then(() => {
  console.log('Conntected to database!');
}).catch(() => {
  console.log('Conntection failed!');
});

// redundant middleware, showing res is required
// app.use((req, res, next) => {
//   console.log('First middleware');
//   next();
// });

// app.use((req, res, next) => {
//   res.send('Hello from express!');
// });

// must call bodyparser before we want to use it
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));

// Middleware
app.use('/images', express.static(path.join('backend/images')));

// We need to manipulate the response because we want to add headers to it
app.use((req, res, next) => {
  // the first argument is the key and the second the value
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    // The incoming request may have these additional headers
    // If it has another non-default besides those lists, will be be blocked
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    // OPTIONS WILL IMPLICITLY BE SENT TO TEST BEFORE OTHER REQS
    );
  next();
});


app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
