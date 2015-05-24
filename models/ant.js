var logger = require('../scripts/logger');
var uid = require('uid');
var generateName = require('sillyname');

function Ant(colony){
	this.id = uid();
	this.name = generateName();
	this.role = 'worker';
	this.alive = true;
	this.fed = 1.0;
	this.energy = 1.0;
	this.strength = 3.0;
	this.speed = 10;

	logger.info('Created Ant with name', this.name, ' - role -  ', this.role, ' for colony : ' , colony.name);
}

Ant.prototype.tick = function(dt){
	this.energy -= 1;

	if(this.energy <= 0){
		this.alive = false;
	}
};

module.exports = Ant;