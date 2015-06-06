'use strict';

var currentState ;

function init(options){
  var app = require('express')();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);

  app.listen(options.port);

  app.get('/', function (req, res) {
    //TODO: send git submodule ants-client
    res.send(currentState);
  });

  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

  var cp = require('child_process');

  var n = cp.fork(__dirname + '/program.js');

  n.on('message', function(m) {
    currentState = m;
  });

  n.send({ action: 'start', options : options });
}


module.exports = {
  init : init
};