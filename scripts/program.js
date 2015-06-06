var logger = require('./logger');
var Colony = require('../models/colony');
var Day = require('../models/day');
var communicate = require('./communication/communicate');

var now, then, running = true;

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

function stop(){
	console.log('stop');
	running = false;
}

function loop(colony, day){
	now = Date.now();
	var dt = (now - then) * 1000;

	day.tick(dt);
	colony.tick(dt);

	now = then;

	communicate({ colony : colony });

	if(running){
		process.nextTick(function(){
			loop(colony, day);
		});
	}
	
}

module.exports = {
	init : init
}


//Child process handling
process.on('message', function(m) {
	switch(m.action){
		case 'start':
			init(m.options);
		break;
		case 'stop':
			stop();
		break;
	}
});
