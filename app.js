var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
mongoose.Promise = global.Promise;
mongoose.connect(config.dev.dbConfig, function () {
    console.log('Mongodb connected')
});

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('env', 'development');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view cache', true);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/cards', routes);
app.use('/cards-v2', routes);
app.use('/table', routes);
app.use('/player-sub-on-tracking', routes);
app.use('/player-tracking-data', routes);
app.post('/get-players', routes);
app.post('/verify', routes);
app.post('/get-player-tracking-data', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

app.listen(3002, function () {
    console.log('App start on port 3002')
});
