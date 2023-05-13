const db = require('../models');
const Draft = db.drafts;
const Post = db.posts;
const { validationResult } = require('express-validator');

exports.createDraft = async (req, res, next) => {
  const { title, content } = req.body;
  const draft = {
    title: title,
    content: content,
    userId: req.query.userId,
  };

  const err = validationResult(req);

  try {
    if (!err.isEmpty()) {
      err.statusCode = 400;
      err.message = err.errors[0].msg;
      console.log(err);
      throw err;
    }
    await Draft.create(draft);
    res.json({
      success: 'Post saved to draft! Succesfully ',
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.drafts = async (req, res, next) => {
  try {
    const drafts = await Draft.findAll({
      where: {
        userId: req.query.userId,
      },
    });
    res.json({
      drafts: drafts,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.editDraft = async (req, res, next) => {
  const { draftId, userId } = req.query;
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;
  const err = validationResult(req);
  try {
    if (!err.isEmpty()) {
      err.statusCode = 400;
      err.message = err.errors[0].msg;
      console.log(err);
      throw err;
    }
    const editedDraft = await Draft.update(
      {
        title: updatedTitle,
        content: updatedContent,
      },
      {
        where: { userId: userId, id: draftId },
      }
    );
    if (editedDraft) {
      res.json({
        success: 'post updated',
      });
    } else {
      throw new Error('Not updated,user or draft may not exit.');
    }
  } catch (err) {
    next(err);
  }
};

exports.publishDraft = async (req, res, next) => {
  const { draftId, userId } = req.query;
  try {
    const draft = await Draft.findOne({ where: { id: draftId, userId } });
    if (!draft) {
      const err = new Error('draft not exist');
      err.statusCode = 402;
      console.log(err);
      throw err;
    }
    const post = {
      title: draft.title,
      content: draft.content,
    };
    const deletedPost = await Draft.destroy({ where: { id: draftId } });
    if (deletedPost) {
      await Post.create(post);
      res.json({
        success: 'post published',
      });
    } else {
      throw new Error('post does not exit');
    }
  } catch (err) {
    next(err);
  }
};
