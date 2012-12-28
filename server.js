var express = require('express');
var path = require('path');
var http = require('http');
var io = require('socket.io');
var room = require('./routes/room');
var user = require('./routes/user');

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'the-best-secret-in-the-world' }));
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: app.root + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
});

var server = http.createServer(app);
io = io.listen(server);

io.configure(function() {
  io.set('authorization', function (handshakeData, callback) {
    if (handshakeData.xdomain) {
      callback('Cross-domain connections are not allowed');
    } else {
      callback(null, true);
    }
  });
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 1); 
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

//app.get('/', room.findAll);
//app.post('/', room.addRoom);
app.get('/', user.main);
app.post('/', user.login);
app.get('/home', user.home);
app.post('/home', user.updateAccount);
app.get('/signup', user.createAccount);
app.post('/signup', user.signUp);
app.post('/lost-password', user.passwordReset);
app.get('/reset-password', user.getResetPasswordPage);
app.post('/reset-password', user.submitResetPassword);
app.get('/print', user.print);
app.post('/delete', user.delete);
app.get('/reset', user.reset);

app.get('/rooms/:title', room.findByTitle);
app.put('/rooms/:title', room.updateRoom);
app.delete('/rooms/:title', room.deleteRoom);

io.sockets.on('connection', function (socket) {
  
  socket.on('message', function (message) {
    console.log('Got message: ' + message);
  });
  
  socket.on('disconnect', function () {
    console.log('Socket disconnected.');
  });
  
  socket.on('changeRoomVideo', function(data) {
    console.log('server.js received changeRoomVideo');
    console.log(data);
    io.sockets.emit('changeRoomVideo', { 'youtube': data });
  });

  
});