//Router for the app

var async = require('async');

//Route for root page
var getMain = function(req, res) {
	res.render('main.ejs');
};

var routes = {
	get_main: getMain
}

module.exports = routes;