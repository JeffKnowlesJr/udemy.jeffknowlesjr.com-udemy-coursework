const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const multer = require('multer');
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    callBack(error, 'backend/images'); // relative to server.js folder
  },
  filename: (req, file, callBack) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callBack(null, name + '-' + Date.now() + '.' + ext);
  }
});


// patcch is for editting only some of the obj
router.put('/:id', multer({storage: storage}).single('image'), (req, res, next) => {
  console.log(req.file);
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'});
  });
});


// npm install --save body-parser
// POST
router.post('', multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  });
  console.log(post);
  // One cool amazing mongoose method
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added Successfully',
      post: {
        // ...createdPost, // We were warned about possible complications with
        // id:createdPost._id // using this feature and Mongoose, check it out
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath
      }
    });
  });
  // 201 ok and resource added
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'});
    }
  });
});

router.get('', (req, res, next) => {
  // + converts to numbers
  const pageSize = +req.query.pagesize;
  const currrentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currrentPage) {
    postQuery
      .skip(pageSize * (currrentPage - 1))
      .limit(pageSize);
      // Still runs on all items in DB
  }
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
  postQuery
    .then(documents => {
      fetchedPosts = documents;
    // console.log(documents);
    // posts = documents;
    // res.status(200).json({
    //   message: 'Posts fetched successfully!',
    //   posts: posts
    // });
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: fetchedPosts,
      maxPosts: count
      });
    });
});

// Dynamic path segment
router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post deleted!'});
  });
});

module.exports = router;
