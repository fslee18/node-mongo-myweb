var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


//Set up connection to MongoDB
var mongoUrl = 'mongodb://admin:test123@ds153815.mlab.com:53815/fungshan';
mongoose.connect(mongoUrl, { useNewUrlParser: true,useCreateIndex: true}, function (err) {
  if (err) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  }
});

//Reference the route
const api = require('./routes/api');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set up the router for the courses
app.use('/', api);


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



//Clean up the connection when cntrl+c is pressed
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log("Closing the mongodb connection");
    process.exit(0);
  });
});

module.exports = app;