const express = require('express');
const router = express.Router();
const draftsController = require('../controller/draftsController');
const authorize = require('../middleware/auth');
const { body } = require('express-validator');

router.get('/drafts', authorize, draftsController.drafts);
router.post(
  '/draft',
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
  draftsController.createDraft
);
router.post(
  '/editdraft',
  body('title')
    .not()
    .isEmpty()
    .withMessage('title must not be empty')
    .isLength({ min: 5 })
    .withMessage('title min length must be 5'),
  body('content')
    .not()
    .isEmpty()
    .withMessage('content must not be empty')
    .isLength({ min: 5 })
    .withMessage('content min length must be 5'),
  authorize,
  draftsController.editDraft
);
router.get('/publishdraft', authorize, draftsController.publishDraft);

module.exports = router;
