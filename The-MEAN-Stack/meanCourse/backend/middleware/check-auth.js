const jwt = require('jsonwebtoken');

// Middleware is just a function which gets executed on the incoming requests
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret_this_should_be_longer'); //SECRET PASSWORD
    next();
  } catch (error) {
    res.status(401).json({message: 'Auth Failed!'});
  }
}
