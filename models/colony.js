var uid = require('uid');
var logger = require('../scripts/logger');
var Ant = require('./ant');
var _ = require('lodash');
var events = require('../scripts/events');

function Colony(antsAmount, name){
	this.name = name;
	this.ants = [];
	this.supplies = 100;
	this.id = uid();

	this.suscribe();

	for(var i = 0; i < antsAmount; i++){
		this.ants.push(new Ant(this));
	}

	logger.highlight('Created colony with ants', this.ants.length, ' and name ', this.name);
}

Colony.prototype.suscribe = function(){
    events.suscribe('colony:underattack', 'colony', function(){ });

    events.suscribe('colony:ant:feed', 'colony', this.feedAnt.bind(this));

    events.suscribe('colony:ant:addSupplies', 'colony', this.receiveSupplies.bind(this));

    events.suscribe('colony:queen:antBorn', 'colony', function(){ });
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

Colony.prototype.receiveSupplies = function(amount){
    this.supplies += amount;
};

Colony.prototype.feedAnt = function(ant){
    this.supplies -= 10;
    ant.eat(10);
};

module.exports = Colony;