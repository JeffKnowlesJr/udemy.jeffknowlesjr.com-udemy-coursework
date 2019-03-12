const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const Post = require('./models/post');

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


// We need to manipulate the response because we want to add headers to it
app.use((req, res, next) => {
  // the first argument is the key and the second the value
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
    );
    // The incoming request may have these additional headers
    // If it has another non-default besides those lists, will be be blocked
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
    // OPTIONS WILL IMPLICITLY BE SENT TO TEST BEFORE OTHER REQS
    );
  next();
});

// npm install --save body-parser
// POST
app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  // One cool amazing mongoose method
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added Successfully',
      postId: createdPost._id
    });
  });
  // 201 ok and resource added
});

app.get('/api/posts', (req, res, next) => {
  // const posts = [
  //   {
  //     id: '230459',
  //     title: 'First server-side post',
  //     content: 'This is coming form the server.'
  //   },
  //   {
  //     id: '132464',
  //     title: 'Second server-side post',
  //     content: 'This is also coming form the server!!!'
  //   }
  // ]
  // res.json(posts);
  // find is a static method provided to the model by Mongoose
  Post.find().then(documents => {
    console.log(documents);
    posts = documents;
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: posts
    });
  });
});

// Dynamic path segment
app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post deleted!'});
  });
});

module.exports = app;
