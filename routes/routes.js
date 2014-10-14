//Router for the app

var async = require('async');
var http = require('http');

//Route for root page
var getMain = function(req, res) {
	res.render('main.ejs');
};

var getIndeed = function(query, location, callbackToSearch) {
	var i = 0;

	var indeedQueryPath = "/ads/apisearch?publisher=1474148037537663";
	if (!query) {
		callbackToSearch("Please specify a job type", null);
	} else {
		// add the search for query into the path
		indeedQueryPath += "&q=";
		var queryArray = query.split(" ");
		for (i = 0; i < queryArray.length; i++) {
			indeedQueryPath += "+" + queryArray[i];
		}

		indeedQueryPath += "&l=";
		if (location) {
			var locationArray = location.split(" ");
			for (i = 0; i < locationArray.length; i++) {
				indeedQueryPath += "+" + locationArray[i];
			}
		}

		indeedQueryPath += "&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2";
		console.log(indeedQueryPath);
	}

	//'/ads/apisearch?publisher=1474148037537663&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2'
	var options = {
		host: 'api.indeed.com',
		path: indeedQueryPath
	};

	var callback = function(res) {
  		var str = '';

  		//another chunk of data has been recieved, so append it to `str`
  		res.on('data', function (chunk) {
    		str += chunk;
  		});

  		//the whole response has been recieved, so we just print it out here
  		res.on('end', function () {
    		callbackToSearch(null, str);
  		});
	};

	http.request(options, callback).end();
};

var postSearch = function(req, res) {
	var query = req.body.query;
	var location = req.body.loc;
	getIndeed(query, location, function(err, data) {
		if (err) {
			req.session.message = err;
			res.redirect('/');
		} else if (data) {
			/*
			var xml2js = require('xml2js');
			var xml = data;

			var parser = new xml2js.Parser();
			parser.parseString(xml, function(err,result){
			  //Extract the value from the data element
			  console.dir(result);
			});*/
		
			res.render('results.ejs', {data: data});
			console.log(data);
		}
	});
};


var routes = {
	get_main: getMain,
	get_indeed: getIndeed,
	post_search: postSearch
}

module.exports = routes;