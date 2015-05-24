var logger = require('./logger');
var Colony = require('../models/colony');
var Day = require('../models/day');

function init(options){

	logger.fancy('ANTS - v0', function(){
		logger.info('Starting program');

		var colony = new Colony(10, options.colony_name);
		var day = new Day();
		loop(colony, day);
	});
	
}

function loop(colony, day){

	day.tick();
	colony.tick();
	
	process.nextTick(function(){
		loop(colony, day);
	});
}

module.exports = {
	init : init
}