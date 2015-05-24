var art = require('ascii-art');

function info(){
	console.log.apply(null, arguments);
}

function fancy(text){
	art.font(text, 'Basic', 'red', function(rendered){
	    console.log(rendered);
	});
}

module.exports = {
	info : info,
	fancy : fancy
}