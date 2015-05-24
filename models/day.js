var uid = require('uid');
var logger = require('../scripts/logger');
var moment = require('moment');

function Day(){
	this.number = 1;
	this.time = (new Date(2015, 05, 01, 00, 00)).getTime();
	this.weather = 'sunny';
	
	logger.info('Created Day with weather', this.weather, ' and date ', moment(this.time).format("MM-DD-YYYY HH:mm"));
}

Day.prototype.logTime = function(){
	logger.info('Day time: - ', moment(this.time).format("MM-DD-YYYY HH:mm"));
};

Day.prototype.tick = function(dt){
	
	this.time += dt;

	//this.logTime();
};

module.exports = Day;