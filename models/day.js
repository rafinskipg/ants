var uid = require('uid');
var logger = require('../scripts/logger');
var moment = require('moment');

function Day(){
	this.number = 1;
	this.time = (new Date(2015, 05, 01, 00, 00)).getTime();
	this.weather = 'sunny';
	this.then = Date.now();
	this.now = Date.now();

	logger.info('Created Day with weather', this.weather, ' and date ', moment(this.time).format("MM-DD-YYYY HH:mm"));
}

Day.prototype.logTime = function(){
	logger.info('Day time: - ', moment(this.time).format("MM-DD-YYYY HH:mm"));
};

Day.prototype.tick = function(){
	this.now = Date.now();
	var dt = this.now - this.then;
	
	this.time += dt * 1000;

	this.then = this.now;

	//this.logTime();
};

module.exports = Day;