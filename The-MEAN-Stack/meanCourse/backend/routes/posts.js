const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

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
router.put('/:id', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
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
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne({_id: req.params.id, creator: req.userData.userId }, post).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({message: 'Update successful!'});
    } else {
      res.status(401).json({message: 'Not Authorized!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Couldn\'t update post.'
    });
  }); // Catch will only be reached if something goes wrong 'technically'
});


// npm install --save body-parser
// POST
router.post('', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
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
        imagePath: createdPost.imagePath,
        creator: createdPost.creator
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Creating a post failed.'
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
  })
  .catch(error => {
    res.status(500).json({
      message: 'Fetching post failed.'
    });
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
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching posts failed.'
      });
    });
});

// Dynamic path segment
router.delete('/:id', checkAuth, (req, res, next) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    if (result.n > 0) {
      res.status(200).json({message: 'Deletion successful!'});
    } else {
      res.status(401).json({message: 'Not Authorized!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Deleting post failed.'
    });
  });
});

module.exports = router;
