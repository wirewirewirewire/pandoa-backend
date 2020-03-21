// server.js
require('console-stamp')(console, '[HH:MM:ss.l]');
require("dotenv").config();
var Case = require('./app/models/case');

var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var configDB = require("./config/database.js");
const bodyParser = require('body-parser');


if (process.env.NODE_ENV !== "development") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/pandoa.wirewire.de/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/pandoa.wirewire.de/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/pandoa.wirewire.de/chain.pem",
    "utf8"
  );
  var credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };
}

if (process.env.NODE_ENV !== "development") {
  var httpsServer = require("https").Server(credentials, app);
}
const httpServer = require("http").createServer(app);
const httpApp = express();

// configuration ===============================================================
console.log ("[Server] Environmend for Server is: "  + process.env.NODE_ENV);
if (process.env.NODE_ENV !== "development") {
  httpApp.all("*", (req, res) => {
    res.redirect("https://" + req.headers.host + req.url);
  });
}

if (process.env.NODE_ENV !== "development") {
  var port = process.env.PORT || 80;
  var port_s = process.env.PORT_S || 443;
} else {
  var port = process.env.PORT || 3000;
  var port_s = process.env.PORT_S || 3001;
}

//const MongoStore = require("connect-mongo")(session);
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true }); // connect to our database
mongoose.set("useCreateIndex", true);

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a"
});
app.use(morgan("combined", { stream: accessLogStream }));


// required for passport
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

passport.use(Case.createStrategy());
passport.serializeUser(Case.serializeUser());
passport.deserializeUser(Case.deserializeUser());

// routes ======================================================================
require("./app/routes.js")(app, passport); // load our routes

// http API Server
httpServer.listen(port, () => {
  if (process.env.NODE_ENV == "development") {
    console.log("[Server] HTTP Dev API: 0.0.0.0:" + port);
  }
});
// https API Server
if (process.env.NODE_ENV !== "development") {
  httpsServer.listen(port_s);
  console.log("[Server] HTTPS WEB/API Port is: " + port_s);
}

process.on("SIGINT", () => {
  console.log("Bye bye!");
  process.exit();
});

Case.register({username:'aba', active: false}, 'aba');