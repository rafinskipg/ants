var logger = require('../scripts/logger');
var uid = require('uid');
var generateName = require('sillyname');

function Ant(colony){
	this.id = uid();
	this.name = generateName();
	this.role = 'worker';
	logger.info('Created Ant with name', this.name, ' - role -  ', this.role, ' for colony : ' , colony.name);
}

module.exports = Ant;