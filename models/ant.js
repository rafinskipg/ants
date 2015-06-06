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

	this.action = 'stopped';

	this.location = new Victor(colony.position.x, colony.position.y);

	logger.info('Created Ant with name', this.name, ' - role -  ', this.role, ' for colony : ' , colony.name);
}

Ant.prototype.tick = function(dt){

	//Apply time constraints, like hunger
	//TODO: remove energy based on the job its doing
	this.fed -= 0.0001;
	this.energy -= 0.0001;

	switch (this.action) {
		case 'stopped':
			events.trigger('colony:ant:giveMeAnythingToDo', this);
			break;
		case 'goto':
			//This update movement
			break;
		case 'working':
			//This do work action
			break;
		default:

	}

	if(this.fed <= this.nutritionWarning){
		logger.warn(this.name, 'is starving...');
		//TODO: change for ant:needsFood that will trigger a goto action to the nearest food location
		events.trigger('colony:ant:feed', this);
	}

	//It has hunger, it is dying of starvation
	if(this.fed <= this.nutritionWarning){
		this.energy -= 0.1;
	}

	//No energy, it dies or goes to sleep
	if(this.energy <= 0){
		this.alive = false;
	}
};

/**
	Gives 'fed' and 'energy' to the ant
**/
Ant.prototype.eat = function(amount){
	this.fed += amount * 10;
	this.energy += amount * 10;
};

/**
	Sets an action and a completion callback
	TODO: add uncompletion callback
**/
Ant.prototype.setAction = function(actionName, callback){
	this.actionCallback = callback;
	this.action = actionName;
};


module.exports = Ant;
