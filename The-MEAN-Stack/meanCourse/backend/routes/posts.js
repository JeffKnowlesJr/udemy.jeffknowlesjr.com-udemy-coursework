const PostController = require('../controllers/posts');
const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');




// patcch is for editting only some of the obj
router.put('/:id', checkAuth, extractFile, PostController.updatePost);


// npm install --save body-parser
// POST
router.post('', checkAuth, extractFile, PostController.createPost);

router.get('/:id', PostController.getPost);

router.get('', PostController.getPosts);

// Dynamic path segment
router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;
