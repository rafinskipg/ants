var uid = require('uid');
var logger = require('../scripts/logger');
var Ant = require('./ant');
var _ = require('lodash');

function Colony(antsAmount, name){
	this.name = name;
	this.ants = [];
	this.id = uid();

	for(var i = 0; i < antsAmount; i++){
		this.ants.push(new Ant(this));
	}

	logger.highlight('Created colony with ants', this.ants.length, ' and name ', this.name);
}

Colony.prototype.tick = function(dt){


	this.ants = _.compact(this.ants.map(function(ant){
		ant.tick(dt);
		if(ant.alive){
			return ant;
		}else{
			logger.warn('The colony has lost one citizen :(');
		}
	}));

};

module.exports = Colony;