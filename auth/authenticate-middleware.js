/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (res.locals.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedJwt) => {
      if(err) return res.status(401).json({ message: "Unverified token!" });
      res.locals.decodedJwt = decodedJwt;
      next();
    });
  } else res.status(401).json({ you: 'shall not pass!' });
};
