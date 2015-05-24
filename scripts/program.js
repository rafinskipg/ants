var logger = require('./logger');
var Colony = require('../models/colony');
var Day = require('../models/day');

var now, then;

function init(options){
	then = Date.now();
	now = Date.now();

	logger.fancy('ANTS - v0', function(){
		logger.info('Starting program');

		var colony = new Colony(10, options.colony_name);
		var day = new Day();
		loop(colony, day);
	});
	
}

function loop(colony, day){
	now = Date.now();
	var dt = (now - then) * 1000;

	day.tick(dt);
	colony.tick(dt);

	now = then;
	process.nextTick(function(){
		loop(colony, day);
	});
}

module.exports = {
	init : init
}