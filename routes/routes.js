//Router for the app

var async = require('async');
var http = require('http');
var XmlStream = require('xml-stream');

var indeedResults = [];
var careerBuilderResults = [];

//Route for root page
var getMain = function(req, res) {
	res.render('main.ejs');
};

var postSearch = function(req, res) {
	var query = req.body.query;
	var location = req.body.loc;
	var source = req.body.srce;

	console.log("Source: " + source);

	if (source == "indeed") {
		getIndeed(query, location, function(err, data) {
			callbackIndeed(err, data, function(err, data) {
				if (err) {
					req.session.message = err;
					res.redirect('/');
				} else {
					res.render('results.ejs', {data: indeedResults});
				}
				
			})
		})
	} else if (source == "cb") {
		getCareerBuilder(query, location, function(err, data) {
			callbackCareerBuilder(err, data, function(err, data) {
				if (err) {
					req.session.message = err;
					res.redirect('/');
				} else {
					res.render('results.ejs', {data: careerBuilderResults});
				}
			})
		})
	}

	
};

var getCareerBuilder = function(query, location, callbackToSearch) {
	var i = 0;
	var cbQueryPath = "/v1/jobsearch?DeveloperKey=WDHS8FY734KMFC4YC4ZP";

	if (!query) {
		callbackToSearch("Please specify a job type", null);
	} else {
		cbQueryPath += "&Keywords=";
		var queryArray = query.split(" ");
		for (i = 0; i < queryArray.length; i++) {
			cbQueryPath += "+" + queryArray[i];
		}

		cbQueryPath += "&Location=";
		if (location) {
			var locationArray = location.split(" ");
			for (i = 0; i < locationArray.length; i++) {
				cbQueryPath += "+" + locationArray[i];
			}
		}

		console.log(cbQueryPath);
	}

	var options = {
		host: 'api.careerbuilder.com',
		path: cbQueryPath
	};

	var request = http.get(options).on('response', function(response) {
		console.log(response);
		callbackToSearch(null, response);
	});
};

var callbackCareerBuilder = function(err, data, callbackErr) {

	if (err) {
		callbackErr(err, null);
	} else if (data) {
		console.log("reached callback");
		var xml = new XmlStream(data, 'utf8');
		xml.preserve('JobSearchResult', true);
		xml.collect('subitem');
		careerBuilderResults[0] = "CareerBuilder";
		var i = 1;
		
		xml.on('endElement: JobSearchResult', function(item) {
		  careerBuilderResults[i] = {};
		  careerBuilderResults[i].company = JSON.stringify(item.Company['$name']) +' : ' 
		  					 + JSON.stringify(item.Company['$text']);
		  careerBuilderResults[i].companyDID = JSON.stringify(item.CompanyDID['$name']) +' : ' 
		  					 + JSON.stringify(item.CompanyDID['$text']);
		  careerBuilderResults[i].companyDetailsURL = JSON.stringify(item.CompanyDetailsURL['$name']) +' : ' 
		  					 + JSON.stringify(item.CompanyDetailsURL['$text']);
		  careerBuilderResults[i].DID = JSON.stringify(item.DID['$name']) +' : ' 
		  					 + JSON.stringify(item.DID['$text']);
		  careerBuilderResults[i].oNetCode = JSON.stringify(item.OnetCode['$name']) +' : ' 
		  					 + JSON.stringify(item.OnetCode['$text']);
		  careerBuilderResults[i].oNetFriendlyTitle = JSON.stringify(item.ONetFriendlyTitle['$name']) +' : ' 
		  					 + JSON.stringify(item.ONetFriendlyTitle['$text']);
		  careerBuilderResults[i].descriptionTeaser = JSON.stringify(item.DescriptionTeaser['$name']) +' : ' 
		  					 + JSON.stringify(item.DescriptionTeaser['$text']);
		  careerBuilderResults[i].distance = JSON.stringify(item.Distance['$name']) +' : ' 
		  					 + JSON.stringify(item.Distance['$text']);
		  careerBuilderResults[i].employmentType = JSON.stringify(item.EmploymentType['$name']) +' : ' 
		  					 + JSON.stringify(item.EmploymentType['$text']);
		  careerBuilderResults[i].educationRequired = JSON.stringify(item.EducationRequired['$name']) +' : ' 
		  					 + JSON.stringify(item.EducationRequired['$text']);
		  careerBuilderResults[i].experienceRequired = JSON.stringify(item.ExperienceRequired['$name']) +' : ' 
		  					 + JSON.stringify(item.ExperienceRequired['$text']);
		  careerBuilderResults[i].jobDetailsURL = JSON.stringify(item.JobDetailsURL['$name']) +' : ' 
		  					 + JSON.stringify(item.JobDetailsURL['$text']);
		  careerBuilderResults[i].jobServiceURL = JSON.stringify(item.JobServiceURL['$name']) +' : ' 
		  					 + JSON.stringify(item.JobServiceURL['$text']);
		  careerBuilderResults[i].location = JSON.stringify(item.Location['$name']) +' : ' 
		  					 + JSON.stringify(item.Location['$text']);
		  careerBuilderResults[i].displayCity = JSON.stringify(item.DisplayCity['$name']) +' : ' 
		  					 + JSON.stringify(item.DisplayCity['$text']);
		  careerBuilderResults[i].city = JSON.stringify(item.City['$name']) +' : ' 
		  					 + JSON.stringify(item.City['$text']);
		  careerBuilderResults[i].state = JSON.stringify(item.State['$name']) +' : ' 
		  					 + JSON.stringify(item.State['$text']);
		  careerBuilderResults[i].locationLatitude = JSON.stringify(item.LocationLatitude['$name']) +' : ' 
		  					 + JSON.stringify(item.LocationLatitude['$text']);
		  careerBuilderResults[i].locationLongitude = JSON.stringify(item.LocationLongitude['$name']) +' : ' 
		  					 + JSON.stringify(item.LocationLongitude['$text']);
		  careerBuilderResults[i].postedDate = JSON.stringify(item.PostedDate['$name']) +' : ' 
		  					 + JSON.stringify(item.PostedDate['$text']);
		  careerBuilderResults[i].pay = JSON.stringify(item.Pay['$name']) +' : ' 
		  					 + JSON.stringify(item.Pay['$text']);
		  careerBuilderResults[i].similarJobsURL = JSON.stringify(item.SimilarJobsURL['$name']) +' : ' 
		  					 + JSON.stringify(item.SimilarJobsURL['$text']);
		  careerBuilderResults[i].jobTitle = JSON.stringify(item.JobTitle['$name']) +' : ' 
		  					 + JSON.stringify(item.JobTitle['$text']);
		  careerBuilderResults[i].companyImageUrl = JSON.stringify(item.CompanyImageURL['$name']) +' : ' 
		  					 + JSON.stringify(item.CompanyImageURL['$text']);
		  careerBuilderResults[i].applyRequirements = JSON.stringify(item.ApplyRequirements['$name']) +' : ' 
		  					 + JSON.stringify(item.ApplyRequirements['$text']);
		  careerBuilderResults[i].skills = JSON.stringify(item.Skills['$name']) +' : ' 
		  					 + JSON.stringify(item.Skills['$text']);
		  
		  i++;
		  //res.render('results.ejs', {data: item[0].jobtitle});
		});

		xml.on('endElement: Results', function(item) {
			console.log(careerBuilderResults);
			callbackErr(null, careerBuilderResults);
		})
	}
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

	var request = http.get(options).on('response', function(response) {
			callbackToSearch(null, response);
	}); 
};

var callbackIndeed = function(err, data, callbackErr) {
	if (err) {
		callbackErr(err, null);
	} else if (data) {
		var xml = new XmlStream(data, 'utf8');
		xml.preserve('result', true);
		xml.collect('subitem');
		indeedResults[0] = "Indeed";
		var i = 1;
		
		xml.on('endElement: result', function(item) {
		  indeedResults[i] = {};
		  indeedResults[i].jobtitle = JSON.stringify(item.jobtitle['$name']) +' : ' 
		  					 + JSON.stringify(item.jobtitle['$text']);
		  indeedResults[i].company = JSON.stringify(item.company['$name']) +' : ' 
		  					 + JSON.stringify(item.company['$text']);
		  indeedResults[i].city = JSON.stringify(item.city['$name']) +' : ' 
		  					 + JSON.stringify(item.city['$text']);
		  indeedResults[i].state = JSON.stringify(item.state['$name']) +' : ' 
		  					 + JSON.stringify(item.state['$text']);
		  indeedResults[i].country = JSON.stringify(item.country['$name']) +' : ' 
		  					 + JSON.stringify(item.country['$text']);
		  indeedResults[i].source = JSON.stringify(item.source['$name']) +' : ' 
		  					 + JSON.stringify(item.source['$text']);
		  indeedResults[i].date = JSON.stringify(item.date['$name']) +' : ' 
		  					 + JSON.stringify(item.date['$text']);
		  indeedResults[i].snippet = JSON.stringify(item.snippet['$name']) +' : ' 
		  					 + JSON.stringify(item.snippet['$text']);
		  indeedResults[i].url = JSON.stringify(item.url['$name']) +' : ' 
		  					 + JSON.stringify(item.url['$text']);
		  indeedResults[i].latitude = JSON.stringify(item.latitude['$name']) +' : ' 
		  					 + JSON.stringify(item.latitude['$text']);
		  indeedResults[i].longitude = JSON.stringify(item.longitude['$name']) +' : ' 
		  					 + JSON.stringify(item.longitude['$text']);
		  indeedResults[i].jobkey = JSON.stringify(item.jobkey['$name']) +' : ' 
		  					 + JSON.stringify(item.jobkey['$text']);
		  indeedResults[i].sponsored = JSON.stringify(item.sponsored['$name']) +' : ' 
		  					 + JSON.stringify(item.sponsored['$text']);
		  indeedResults[i].expired = JSON.stringify(item.expired['$name']) +' : ' 
		  					 + JSON.stringify(item.expired['$text']);
		  i++;
		  //res.render('results.ejs', {data: item[0].jobtitle});
		});

		xml.on('endElement: results', function(item) {
			console.log(indeedResults);
			callbackErr(null, indeedResults);
		})
	}
};




var routes = {
	get_main: getMain,
	get_indeed: getIndeed,
	post_search: postSearch
}

module.exports = routes;