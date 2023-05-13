const express = require('express');
const router = express.Router();
const postsController = require('../controller/postsController.js');
const authorize = require('../middleware/auth');
const { body } = require('express-validator');
router.get('/posts', authorize, postsController.posts);
router.post(
  '/post',
  body('title')
    .not()
    .isEmpty()
    .withMessage('title must not be empty')
    .isLength({ min: 5 })
    .withMessage('title min length must be 5'),
  body('content')
    .not()
    .isEmpty()
    .withMessage('username must not be empty')
    .isLength({ min: 5 })
    .withMessage('username min length must be 5'),
  authorize,
  postsController.createPost
);
router.post('/editpost/:id', authorize, postsController.editPost);
router.get('/deletepost/:id', authorize, postsController.deletePost);

module.exports = router;
