module.exports = {
  HOST: 'localhost',
  USER: 'newuser',
  PASSWORD: 'password',
  DB: 'Node-Project',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    aquire: 30000,
    idle: 10000,
  },
};
