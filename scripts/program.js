var logger = require('./logger');
var Colony = require('../models/colony');

function init(options){

	logger.fancy('ANTS - v0', function(){
		logger.info('Starting program');

		var colony = new Colony(10, options.colony_name);
	});
	
}

module.exports = {
	init : init
}