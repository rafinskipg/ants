var art = require('ascii-art');
var colors = require('colors');
 

function info(){
	console.log.apply(null, arguments);
}

function warn(){
	console.log(colors.green.apply(null, arguments)); 
}

function highlight(){
	console.log(colors.underline.yellow.apply(null, arguments)); 
}

function blue(){
	console.log(colors.white.bgBlue.apply(null, arguments)); 
}

function green(){
	console.log(colors.white.bgGreen.apply(null, arguments)); 
}

function fancy(text, cb){
	art.font(text, 'Basic', 'red', function(rendered){
	    console.log(rendered);
	    cb();
	});
}

module.exports = {
	info : info,
	warn  : warn,
	highlight  : highlight,
	blue  : blue,
	green  : green,
	fancy : fancy
}