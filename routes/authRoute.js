const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js');
const { body } = require('express-validator');

router.post(
  '/signup',
  body('username')
    .not()
    .isEmpty()
    .withMessage('username must not be empty')
    .isLength({ min: 5 })
    .withMessage('username min length must be 5'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('email must not be empty')
    .isEmail()
    .withMessage('not email format'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('password must not be empty')
    .isLength({ min: 5 })
    .withMessage('password min length must be 5'),
  authController.signup
);
router.post(
  '/login',
  body('email')
    .not()
    .isEmpty()
    .withMessage('username must not be empty')
    .isLength({ min: 5 })
    .withMessage('username min length must be 5'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('password must not be empty')
    .isLength({ min: 5 })
    .withMessage('password min length must be 5'),
  authController.login
);

module.exports = router;
