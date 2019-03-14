const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
// typescript lowercase s, Node.js and Javascript uppercase S
  // title: String
  title: { type: String, required: true },
  content: { type: String, required: true},
  imagePath: { type: String, required: true}
  // Mongoose documentation available for Schema types
});

// Schema is just a blueprint and we need a model

// two arguements name and schema
module.exports = mongoose.model('Post', postSchema);

// collection name will always be plural of model name, eg. posts
