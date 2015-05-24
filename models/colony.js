var uid = require('uid');
var logger = require('../scripts/logger');
var Ant = require('./ant');

function Colony(antsAmount, name){
	this.name = name;
	this.ants = [];
	this.id = uid();

	for(var i = 0; i < antsAmount; i++){
		this.ants.push(new Ant(this));
	}

	logger.info('Created colony with ants', this.ants.length, ' and name ', this.name);
}

module.exports = Colony;