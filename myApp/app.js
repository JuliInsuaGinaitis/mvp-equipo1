var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  let file = path.resolve("views/index.html");
  res.sendFile(file);
});

app.get("/login", function (req, res) {
  let file = path.resolve("views/login.html");
  res.sendFile(file);
});

app.get("/register", function (req, res) {
  let file = path.resolve("views/register.html");
  res.sendFile(file);
});

app.get("/productCart", function (req, res) {
  let file = path.resolve("views/productCart.html");
  res.sendFile(file);
});

app.get("/productDetail", function (req, res) {
  let file = path.resolve("views/productDetail.html");
  res.sendFile(file);
});

app.get("*", (req, res) => {
  if (req.url.endsWith(".css")) {
    let file = path.resolve("style" + req.url);
    return res.sendFile(file);
  }
  let images = ["jpg", "jpeg", "gif", "png", "svg"];
  let ext = req.url.split(".")[1];
  if (images.includes(ext)) {
    let file = path.resolve("img" + req.url);
    return res.sendFile(file);
  }
});


module.exports = app;