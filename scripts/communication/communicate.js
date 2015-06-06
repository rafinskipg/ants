'use strict';

var _ = require('lodash');
var endpoints = require('./endpoints');

function communicate(data, to){
  to = to ? to : 'all';

  if(to === 'all'){
    process.send({ data : data});
    //_broadCast(data, endpoints.getAll());
  }else{
    if(typeof(to) === 'string'){
      to = [to];
    }

    _broadCast(data, to);
  } 
}

function _broadCast(data, endpointsList){
  endpointsList.forEach(function(endpoint){
    //TODO: socket send data
    process.send({ data : data , endpoint : endpoint});
  });
}
module.exports = communicate;
