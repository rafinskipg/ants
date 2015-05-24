var logger = require('./logger');

function init(options){

	logger.fancy('ANTS - v0');
	logger.info('Starting program');


}

module.exports = {
	init : init
}