var logger = require('../scripts/logger');
var uid = require('uid');
var generateName = require('sillyname');
var Victor = require('victor');
var events = require('../scripts/events');

function Ant(colony){
	this.id = uid();
	this.name = generateName();
	this.role = 'worker';
	this.alive = true;
	this.fed = 1.0;
	this.eatCapacity = 0.1;
	this.nutritionWarning = 0.3;

	this.energy = 1.0;
	this.strength = 3.0;
	this.speed = 10;

	this.action = 'working';

	this.location = new Victor(colony.position.x, colony.position.y);

	logger.info('Created Ant with name', this.name, ' - role -  ', this.role, ' for colony : ' , colony.name);
}

Ant.prototype.tick = function(dt){
	this.fed -= 0.000001;
	this.energy -= 0.000001;

	if(this.action === 'working'){
		
	}

	if(this.fed <= this.nutritionWarning){
		events.trigger('colony:ant:feed', this);
	}

	if(this.fed <= this.nutritionWarning){
		this.energy -= 0.1;
	}

	if(this.energy <= 0){
		this.alive = false;
	}
};

Ant.prototype.eat = function(amount){
	this.fed += amount;
	this.energy += amount;
};


module.exports = Ant;
