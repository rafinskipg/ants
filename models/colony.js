var uid = require('uid');
var logger = require('../scripts/logger');
var Ant = require('./ant');
var _ = require('lodash');
var events = require('../scripts/events');
var Victor = require('victor');
var Terrain = require('./colonyTerrain');

function Colony(antsAmount, name){
	this.name = name;
	this.ants = [];
	this.terrain = new Terrain(0,0);
	this.supplies = {
  	grain : 10
  };
	this.id = uid();
    this.position = new Victor(0,0);

	this.suscribe();

	for(var i = 0; i < antsAmount; i++){
		this.ants.push(new Ant(this));
	}

	logger.highlight('Created colony with ants', this.ants.length, ' and name ', this.name);
    logger.blue('Colony has resources: ', JSON.stringify(this.supplies));
}

Colony.prototype.suscribe = function(){
    events.suscribe('colony:underattack', 'colony', function(){ });

    events.suscribe('colony:ant:feed', 'colony', this.feedAnt.bind(this));

    events.suscribe('colony:ant:addSupplies', 'colony', this.receiveSupplies.bind(this));

    events.suscribe('colony:queen:antBorn', 'colony', function(){ });
}

Colony.prototype.tick = function(dt){

	this.checkSupplies();

	this.ants = _.compact(this.ants.map(function(ant){
		ant.tick(dt);
		if(ant.alive){
			return ant;
		}else{
			logger.warn('The colony has lost one citizen :(', 'Dear', ant.name);
		}
	}));
};

Colony.prototype.checkSupplies = function(){
	var totalSupplies = _.keys(this.supplies).reduce(function(prev, next){
		return prev + this.supplies[next];
	}.bind(this), 0);

	var totalSuppliesWouldConsumeAllAnts = this.ants.reduce(function(prev, next){
		return prev + next.eatCapacity;
	}.bind(this), 0);

	if(totalSupplies < totalSuppliesWouldConsumeAllAnts){
		events.trigger('colony:needsfood');
	}
};

Colony.prototype.receiveSupplies = function(amount, type){
    this.supplies[type] += amount;
};

Colony.prototype.feedAnt = function(ant){
    var amount = ant.eatCapacity;
    var type = 'grain';

    var supplyAmount = this.supplies[type] > amount ? amount : this.supplies[type];
    this.supplies[type] -= supplyAmount;

    if(supplyAmount){
        logger.green('Feeding ant :', ant.name, 'with', type, supplyAmount, 'left', this.supplies[type]);
        ant.eat(supplyAmount, type);
    }

};

module.exports = Colony;
