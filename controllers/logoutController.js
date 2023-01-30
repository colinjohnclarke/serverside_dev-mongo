const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;

  // is refrsh token in DB

  const foundUser = await User.findOne({
    refreshToken,
  }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(403);
  }

  // delete refresh token in db

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log("result of delete: ", result);
  res.clearCookie("jwt", { httpOnly: true }); // secure: true  only serves Https
  res.sendStatus(204);
};

module.exports = { handleLogout };
