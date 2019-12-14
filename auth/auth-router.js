const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./authModel.js');
const genToken = require('./generateToken.js');

router.post('/register', requireUser, async (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  const _user = await Users.insert(user);
  const { password, ...noPassword } = _user;
  if (_user) res.status(200).json(noPassword);
  res.status(401).json({ errorMessage: "Username is taken." });
});

router.post('/login', requireUser, async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findBy({ username });
  if (user && bcrypt.compareSync(password, user.password)) {
    return res.status(200).json({
      id: user.id,
      username: user.username,
      token: genToken(user)
    });
  } res.status(401).json({ message: "Invalid credentials" });
});

function requireUser(req, res, next) {
  const user = req.body;
  if (!user.username || !user.password) return res.status(401).json({ message: "Username and password required" });
  next();
}

module.exports = router;
