var logger = require('../scripts/logger');
var uid = require('uid');
var _ = require('lodash');
var Victor = require('victor');
var events = require('../scripts/events');
var TerrainCell = require('./terrainCell');

function excavate(x,y,radius, damage, destroyed){
  var cellsExcavated = [];
  for(var i = x - radius/2; i <= x + radius /2; i++){
    for(var j = y - radius/2; j <= y + radius / 2; j++){
      var terrainCell = new TerrainCell(i, j,destroyed);
      if(damage){
        terrainCell.excavate(damage);
      }
      cellsExcavated.push(terrainCell);
    }
  }

  return cellsExcavated;
}


function Terrain(x,y){
  this.position = new Victor(x,y);
  this.id = uid();
  this.resources = [];
  this.excavated = excavate(x,y, 10, null, true);

  events.suscribe('colony:terrain:excavate', 'colonyTerrain', this.excavate.bind(this));

  logger.blue('Created colony terrain at', this.position.x, this.position.y, 'with size', this.excavated.length);
}

Terrain.prototype.excavate = function(x,y, damage){

  var terrainCellFound = _.filter(this.excavated, function(tCell){
    if(tCell.x === x && tCell.y === y){
      return terrainCellFound
    }
  });

  if(terrainCellFound.length > 0){
    terrainCellFound[0].excavate(damage);
  }else{
    this.excavated.concat(x,y,1,damage);
  }

  logger.blue('Colony terrain has now', this.excavated.length, 'cm2');
};



module.exports = Terrain;
