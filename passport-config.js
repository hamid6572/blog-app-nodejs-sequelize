const localStrategy = require('passport-local');
const passport = require('passport');
const db = require('./models');
const User = db.users;
passport.use(
  new localStrategy(async (username, password, done) => {
    const result = await User.findOne({ where: { username: username } });
    console.log(result);
  })
);
