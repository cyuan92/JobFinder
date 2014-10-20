//Router for the app

var async = require('async');
var http = require('http');
var XmlStream = require('xml-stream');

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

	/*
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

	http.request(options, callback).end(); */
	var request = http.get(options).on('response', function(response) {
		
			/*
			var xml = new XmlStream(response, 'utf8');
			xml.collect('subitem');
			xml.on('endElement: result', function(item) {
			  console.log(item);
			}); */
			callbackToSearch(null, response);
	}); 
};

var postSearch = function(req, res) {
	var query = req.body.query;
	var location = req.body.loc;

	/* test
	
	var options = {
		host: 'api.indeed.com',
		path: '/ads/apisearch?publisher=1474148037537663&q=java&l=pittsburgh&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2'
	};
	var request = http.get(options).on('response', function(response) {
		
			var xml = new XmlStream(response, 'utf8');
			xml.collect('subitem');
			xml.on('endElement: result', function(item) {
			  console.log(item);
			});
	}); 
	 */

	getIndeed(query, location, function(err, data) {
		if (err) {
			req.session.message = err;
			res.redirect('/');
		} else if (data) {
			var xml = new XmlStream(data, 'utf8');
			xml.preserve('result', true);
			xml.collect('subitem');
			var i = 0;
			var results = [];
			xml.on('endElement: result', function(item) {
			  results[i] = {};
			  results[i].jobtitle = JSON.stringify(item.jobtitle['$name']) +' : ' 
			  					 + JSON.stringify(item.jobtitle['$text']);
			  results[i].company = JSON.stringify(item.company['$name']) +' : ' 
			  					 + JSON.stringify(item.company['$text']);
			  results[i].city = JSON.stringify(item.city['$name']) +' : ' 
			  					 + JSON.stringify(item.city['$text']);
			  results[i].state = JSON.stringify(item.state['$name']) +' : ' 
			  					 + JSON.stringify(item.state['$text']);
			  results[i].country = JSON.stringify(item.country['$name']) +' : ' 
			  					 + JSON.stringify(item.country['$text']);
			  results[i].source = JSON.stringify(item.source['$name']) +' : ' 
			  					 + JSON.stringify(item.source['$text']);
			  results[i].date = JSON.stringify(item.date['$name']) +' : ' 
			  					 + JSON.stringify(item.date['$text']);
			  results[i].snippet = JSON.stringify(item.snippet['$name']) +' : ' 
			  					 + JSON.stringify(item.snippet['$text']);
			  results[i].url = JSON.stringify(item.url['$name']) +' : ' 
			  					 + JSON.stringify(item.url['$text']);
			  results[i].latitude = JSON.stringify(item.latitude['$name']) +' : ' 
			  					 + JSON.stringify(item.latitude['$text']);
			  results[i].longitude = JSON.stringify(item.longitude['$name']) +' : ' 
			  					 + JSON.stringify(item.longitude['$text']);
			  results[i].jobkey = JSON.stringify(item.jobkey['$name']) +' : ' 
			  					 + JSON.stringify(item.jobkey['$text']);
			  results[i].sponsored = JSON.stringify(item.sponsored['$name']) +' : ' 
			  					 + JSON.stringify(item.sponsored['$text']);
			  results[i].expired = JSON.stringify(item.expired['$name']) +' : ' 
			  					 + JSON.stringify(item.expired['$text']);
			  i++;
			  //res.render('results.ejs', {data: item[0].jobtitle});
			});

			xml.on('endElement: results', function(item) {
				console.log(results);
				res.render('results.ejs', {data: results});
			})
			/*
			var xml2js = require('xml2js');
			var xml = data;

			var parser = new xml2js.Parser();
			parser.parseString(xml, function(err,result){
			  //Extract the value from the data element
			  console.dir(result);
			});*/
		
			//res.render('results.ejs', {data: data});
			//console.log(data);
		}
	});
};


var routes = {
	get_main: getMain,
	get_indeed: getIndeed,
	post_search: postSearch
}

module.exports = routes;