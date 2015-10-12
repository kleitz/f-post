var express        = require('express')
    , path         = require('path')
    , logger       = require('morgan')
    , validator    = require('express-validator')
    , bodyParser   = require('body-parser')
    , mkdirp       = require('mkdirp')
    , session      = require('express-session')
    , redisStore   = require('connect-redis')(session)
    , fs           = require('fs')
    , mandrill     = require('mandrill-api/mandrill');

global._     = require('underscore');
global.async = require('async');

var app = express();

global.config  = require('./config/'+app.get('env')+'.js');
global.globals = require('./globals/'+app.get('env')+'.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(validator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var store = new session.MemoryStore();

app.use(session({
  secret: config.session.secret,
  name: config.session.key,
  resave: true,
  saveUninitialized: true,
  store: store
}));

process.env.TZ = 'UTC';

app.use('/*', function(req,res,next){
    // if(!req.session.user && req.originalUrl.indexOf('/login') != -1){ //NOT LOGGED
    if(!req.session.user && req.originalUrl.indexOf('/login') == -1){
        return res.redirect("/login");
    } else {
        next();
    }
});

var debug = require('debug')('sale-manager:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

app.use('/', require('./routes/index'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

mkdirp(config.global.paths.tmp, function (err) {
    if (err)
      console.error("ERROR to CREATE TMP DIR!", err);
});

mkdirp(config.global.paths.sources, function (err) {
    if (err)
      console.error("ERROR to CREATE SOURCES DIR!", err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port))
    return val;

  if (port >= 0)
    return port;

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
