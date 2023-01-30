const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
  console.log("attempted to get index");
});

router.get("/test1(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test1.html"));
  console.log("attempted to get tets1");
});

module.exports = router;
