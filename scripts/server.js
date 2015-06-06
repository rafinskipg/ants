'use strict';

var currentState;

var cp = require('child_process');

var forkedGame = cp.fork(__dirname + '/program.js');

forkedGame.on('message', function(m) {
  process.nextTick(function() {
    currentState = m;
  });
});

function init(options){
  var app = require('express')();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);

  app.listen(options.port);

  app.get('/', function (req, res) {
    //TODO: send git submodule ants-client
    res.send(currentState);
  });

  app.get('/stop', function (req, res) {
    //TODO: send git submodule ants-client
    forkedGame.send({action : 'stop'});

    process.nextTick(function(){
      res.send(currentState);
    });
  });

  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

  

  forkedGame.send({ action: 'start', options : options });
}


module.exports = {
  init : init
};