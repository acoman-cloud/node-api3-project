const express = require('express');
const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')
const User = require('./users-model.js');
const Post = require('../posts/posts-model.js');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get(req.query)
    .then(users=>{
      res.status(200).json(users)
    })
    .catch(err=>{
      res.status(500).json({
        message: 'Error retrieving the users',
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res) => {
  User.insert({name:req.name})
    .then(newUser=>{
      res.status(201).json(newUser)
    })
    .catch(err=>{
      res.status(500).json({
        message: 'Error',
      })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  User.update(req.params.id, { name: req.name })
    .then(updatedUser=>{
      res.json(updatedUser)
    })
    .catch(err=>{
      res.status(500).json({
        message: 'Error',
      })
    })
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try{
    await User.remove(req.params.id)
    res.json(req.user)
  }catch (err) {
      res.status(500).json({
        message: 'Error',
      })
    }
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.text)
});

// do not forget to export the router

module.exports = router;
