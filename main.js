
/** Hey **/

//var program = require('./scripts/program');
var server = require('./scripts/server');
var defaults = require('./config/defaults');
var commander = require('commander');
var _ = require('lodash');
var options = _.defaults({}, defaults);

commander
    .version('0.0.1')
    .option('-c, --colony_name [colony_name]', 'Name [colony_name]')
    .option('-p, --player [player_name]', 'Player name [player_name]')
    .option('-d, --debug', 'Debugger')
    .parse(process.argv);


if (commander.colony_name){
    options.colony_name = commander.colony_name;
    console.log('  - Colony name %s', commander.colony_name);
}

if (commander.player_name){
    options.player_name = commander.player_name;
    console.log('  - Player name %s', commander.player_name);
}

server.init({
  port : 3000
});


//program.init(options);
