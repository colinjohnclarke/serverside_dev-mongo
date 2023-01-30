const whitelist = [
  "http://wwww.google.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

const corsOptions = {
  origin: (origin, callback) => {
    if ((whitelist.indexOf(origin) !== -1) | !origin) {
      callback(null, true);
    } else {
      callback(newError("not allowsed by Cors"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
