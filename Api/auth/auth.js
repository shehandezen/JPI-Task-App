const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (payload, opt = {}) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, opt);
};

const verify = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  await verify(token)
    .then((data) => {
      req.user = data;
      next();
    })
    .catch((e) => {
      res.sendStatus(403);
    });
};

const passwordHash = async (password) => {
  let hashedPassword;
  await bcrypt
    .genSalt(10)
    .then((salt) => {
      hashedPassword = bcrypt.hash(password, salt);
    })
    .then((hash) => {
      console.log("Hash: ", hash);
    })
    .catch((err) => console.error(err.message));
  return hashedPassword;
};

const comparePasswords = async (password, hash) => {
  let isMatch;
  await bcrypt
    .compare(password, hash)
    .then((res) => {
      isMatch = res;
    })
    .catch((err) => console.error(err.message));
  return isMatch;
};

module.exports = {
  authenticate,
  generateToken,
  verify,
  passwordHash,
  comparePasswords,
};
