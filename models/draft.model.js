const db = require('./index');
const Users = db.users;
module.exports = (sequelize, Sequelize) => {
  const Draft = sequelize.define('draft', {
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.STRING,
    },
  });
  return Draft;
};
