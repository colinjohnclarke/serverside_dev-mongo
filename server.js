require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3800;
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

// custom middleware logger
// connect t mongo
connectDB();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(cors(corsOptions)); // corss orginin resource sharing

app.use(express.urlencoded({ extended: false }));
//handles form data in url and can pull out as parameter

app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use(express.static("public"));

// router;
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));

// anything after this code below will go via middleware jWT
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.get("/new-page", (req, res) => {
  //    res.sendFile('./views/index.html', { root: __dirname});
  res.redirect(301, "/new-page.html");
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "test", "test1.html"));
});

app.get("/newpage", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "newpage.html"));
});

// route handlers

// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send(err.message);
// });

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "test", "404.html"));
});

mongoose.set("strictQuery", true);

mongoose.connection.once("open", () => {
  console.log("connected to mongo db");

  app.listen(PORT, () => {
    console.log(`server is listening PORT:  ${PORT} `);
  });
});
