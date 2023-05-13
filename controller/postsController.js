const db = require('../models');
const Post = db.posts;
const User = db.users;
const { validationResult } = require('express-validator');

exports.createPost = async (req, res, next) => {
  const { title, content } = req.body;
  const post = {
    title: title,
    content: content,
  };
  const err = validationResult(req);

  try {
    if (!err.isEmpty()) {
      err.statusCode = 400;
      err.message = err.errors[0].msg;
      console.log(err);
      throw err;
    }
    await Post.create(post);
    res.json({
      success: 'post created',
    });
  } catch (err) {
    next(err);
  }
};

exports.posts = async (req, res, next) => {
  try {
    const posts = await User.findAll();
    res.json({
      posts: posts,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.editPost = async (req, res, next) => {
  const { id } = req.params;
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
    const editedPost = await Post.update(
      {
        title: updatedTitle,
        content: updatedContent,
      },
      {
        where: { id: id },
      }
    );
    if (editedPost) {
      res.json({
        success: 'post updated',
      });
    } else {
      throw new Error('Not updated');
    }
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const { id } = req.query;

  try {
    const deletedPost = await Post.destroy({ where: { id: id } });
    if (deletedPost) {
      res.json({
        success: 'post deleted',
      });
    } else {
      throw new Error('post does not exit');
    }
  } catch (err) {
    next(err);
  }
};
