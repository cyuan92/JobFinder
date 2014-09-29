//Router for the app

var async = require('async');
var http = require('http');

//Route for root page
var getMain = function(req, res) {
	res.render('main.ejs');
};

var getIndeed = function(req, res) {
	var options = {
		host: 'api.indeed.com',
		path: '/ads/apisearch?publisher=1474148037537663&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2'
	};

	var callback = function(res) {
  		var str = '';

  		//another chunk of data has been recieved, so append it to `str`
  		res.on('data', function (chunk) {
    		str += chunk;
  		});

  		//the whole response has been recieved, so we just print it out here
  		res.on('end', function () {
    		console.log(str);
  		});
	};

	http.request(options, callback).end();
};

var postSearch = function(req, res) {};


var routes = {
	get_main: getMain,
	get_indeed: getIndeed,
	post_search: postSearch
}

module.exports = routes;