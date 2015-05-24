var art = require('ascii-art');

function info(){
	console.log.apply(null, arguments);
}

function fancy(text, cb){
	art.font(text, 'Basic', 'red', function(rendered){
	    console.log(rendered);
	    cb();
	});
}

module.exports = {
	info : info,
	fancy : fancy
}