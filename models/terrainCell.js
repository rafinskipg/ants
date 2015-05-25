var Victor = require('victor');
var logger = require('../scripts/logger');
var events = require('../scripts/events');

function excavate(x,y,radius){
  var cellsExcavated = [];
  for(var i = x - radius/2; i <= x + radius /2; i++){
    for(var j = y - radius/2; i <= y + radius / 2; j++){
      cellsExcavated.push({
        position: new Victor(i,j),
        state: 'excavated'
      });
    }
  }

  return cellsExcavated;
}

function TerrainCell(x,y, destroyed){
  this.position = new Victor(x,y);
  //Change depending on the material
  this.life = destroyed ? 0 : 10;
  this.resources = [];
}

TerrainCell.prototype.destroy = function(){
  this.life = 0;
  events.trigger('terrain:destroyed', this);
  logger.blue('Destroyed terrain cell at', this.position.x, this.position.y);
};

TerrainCell.prototype.excavate = function(damage){
  this.life -= damage;

  if(this.life <= 0){
    this.destroy();
  }

  logger.blue('Terrain cell with remaining life', this.life);
};

module.exports = TerrainCell;
