const express = require("express");
const {
  authenticate,
  generateToken,
  verify,
  comparePasswords,
} = require("../auth/auth");
const User = require("../db/Schemas/User");
const { getData } = require("../db/dbFuncs");

const router = express.Router();

let refreshTokens = [];

router.post("/login", async (req, res) => {
  const user = await getData(User, { Email: req.body.Email });
  console.log(user);
  if (user.length <= 0) {
    res
      .status(409)
      .json({ status: "error", message: "It seems you haven't an account." });
  } else {
    const isMatch = await comparePasswords(req.body.Password, user[0].Password);
    console.log(isMatch);
    if (isMatch) {
      const payload = await {
        username: user[0].UserName,
        email: user[0].Email,
        role: user[0].Role,
        _id: user[0]._id,
      };
      const accessToken = await generateToken(payload);
      const refreshToken = generateToken(payload, { expiresIn: "50s" });
      refreshTokens.push(refreshToken);
      res.status(200).json({
        status: "success",
        message: "You have successfully signed in!",
        tokens: { accessToken, refreshToken },
      });
    } else {
      res.status(400).json({ status: "error", message: "Incorrect password!" });
    }
  }
});

router.post("/token", async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return rendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  await verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    .then((data) => {
      const accessToken = generateToken({ username: "savindu", role: "admin" });
      res.status(200).json({ accessToken });
    })
    .catch((e) => {
      res.sendStatus(403);
    });
});

router.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

router.get("/authTest", authenticate, (req, res) => {
  console.log(req.user);
  res.status(200).json({ status: "Authenticated" });
});

module.exports = router;
