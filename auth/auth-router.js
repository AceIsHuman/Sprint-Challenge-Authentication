const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./authModel.js');

router.post('/register', requireUser, async (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  const _user = await Users.insert(user);
  const { password, ...noPassword } = _user;
  if (_user) res.status(200).json(noPassword);
  res.status(401).json({ errorMessage: "Username is taken." });
});

router.post('/login', (req, res) => {
  // implement login
});

function requireUser(req, res, next) {
  const user = req.body;
  if (!user.username || !user.password) return res.status(401).json({ message: "Username and password required" });
  next();
}

module.exports = router;
