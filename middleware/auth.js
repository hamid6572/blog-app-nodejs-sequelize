const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const token =
    req.body.token || req.get('Authorization') || req.headers['x-access-token'];
  if (!token) {
    res.status(403).send('A token is required for authorization');
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
  }
  return next();
};
