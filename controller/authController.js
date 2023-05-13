const db = require('../models');
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.signup = async (req, res, next) => {
  const hashedPasswod = await bcrypt.hash(req.body.password, 10);

  const user = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPasswod,
  };

  const err = validationResult(req);
  try {
    if (!err.isEmpty()) {
      err.statusCode = 400;
      err.message = err.errors[0].msg;
      console.log(err);
      throw err;
    }
    const userExist = await User.findOne({ where: { email: user.email } });
    if (userExist) {
      const err = new Error('user exist already');
      err.statusCode = 406;
      throw err;
    } else {
      await User.create(user);
      res.json({ signup: 'success' });
    }
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const err = validationResult(req);

  try {
    if (!err.isEmpty()) {
      err.statusCode = 400;
      err.message = err.errors[0].msg;
      console.log(err);
      throw err;
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      const err = new Error('user not exist');
      err.statusCode = 402;
      console.log(err);
      throw err;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const err = new Error('password does not match.');
      err.statusCode = 402;
      throw err;
    }
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      process.env.SECRET_KEY,
      { expiresIn: '100d' }
    );
    res.json({
      succes: 'login succes',
      token: token,
    });
  } catch (err) {
    next(err);
  }
};
