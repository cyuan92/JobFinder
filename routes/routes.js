//Router for the app

var async = require('async');
var http = require('http');
var XmlStream = require('xml-stream');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var db = require('../models/postgresDB.js');

//indeed variables
var indeedResults = [];
indeedResults[0] = "Indeed";
var numIndeedResults = Number.MAX_VALUE;

//career builder variables
var careerBuilderResults = [];
careerBuilderResults[0] = "CareerBuilder";
var numCBPages = Number.MAX_VALUE;

var numDupes = 0;

var map = {};



//Route for root page
var getMain = function(req, res) {
	if (req.session.user) {
		var name = req.session.fullname;
		var message = req.session.message;
		var user = req.session.user;
		
		res.render('main.ejs', {name: name, message: message, user: user});
	} else {
		res.redirect('/');
	}
};

var postSearch = function(req, res) {
	var query = req.body.query;
	var location = req.body.loc;
	var source = req.body.srce;
	var user = req.session.user;

	console.log("Source: " + source);

	if (source == "indeed") {
		getIndeed(query, location, 0, function(err, data) {
			if (err) {
				req.session.message = err;
				res.redirect('/');
			} else {
				res.render('results.ejs', {data: data, numDupes: numDupes, queryType: "indeed", user: user});
			}
		})
	} else if (source == "cb") {
		getCareerBuilder(query, location, 1, function(err, data) {
			if (err) {
				req.session.message = err;
				res.redirect('/');
			} else {
				res.render('results.ejs', {data: data, numDupes: numDupes, queryType: "cb", user: user});
			}
		})
	} else if (source == "combine") {
		aggregateMaps(query, location, function(err, data) {
			if (err) {
				req.session.message = err;
				res.redirect('/');
			} else {
				res.render('results.ejs', {data: map, numDupes: numDupes, queryType: "combine", user: user});
				//res.render('results.ejs', {data: data});
			}
		})
	}

	
};

var aggregateMaps = function(query, location, callbackToSearch) {
	var indeedDone = false;
	var cbDone = false;
	var loop = true;
	var advanced = false;

	getIndeed(query, location, 0, function(err, data) {
		indeedDone = true;
		if (cbDone && !advanced) {
			advanced = true;
			putIndeedIntoMap(1, function() {
				putCBIntoMap(1, function() {
					callbackToSearch(null, "done");
				})
			});
		}
	});

	getCareerBuilder(query, location, 1, function(err, data) {
		cbDone = true;
		if (indeedDone && !advanced) {
			advanced = true;
			putIndeedIntoMap(1, function() {
				putCBIntoMap(1, function() {
					callbackToSearch(null, "done");
				})
			});
		}
	});
};

var putIndeedIntoMap = function(i, callback) {
	console.log("Putting indeed result " + i + " into map");
	if (i == indeedResults.length) {
		console.log("done putting indeed");
		callback(null, "done putting indeed");
	} else if (indeedResults[i]) {
		var company = JSON.stringify(indeedResults[i].company['$text']);
		var city = JSON.stringify(indeedResults[i].city['$text']);
		var state = JSON.stringify(indeedResults[i].state['$text']);
		var jobTitle = JSON.stringify(indeedResults[i].jobtitle['$text']);
		var snippet = JSON.stringify(indeedResults[i].snippet['$text']);
		var date = JSON.stringify(indeedResults[i].date['$text']);
		var url = JSON.stringify(indeedResults[i].url['$text']);

		var hash = hashJob(company, city, state, jobTitle, snippet);
		var value = "i_company: " + company + "i_city: " + city + "i_state: " + state 
					+ "i_jobTitle: " + jobTitle + "i_snippet: " + snippet + "i_date: " + date
					+ "i_url: " + url;  
		if(!map[hash]) {
				map[hash] = value;
		} else {
			numDupes++;
			var v = map[hash];
			v += " DUPLICATE: " + value;
			map[hash] = v;
		}
		putIndeedIntoMap(i+1, callback);
	}
	
}

var putCBIntoMap = function(i, callback) {
	console.log("Putting careerBuilder result " + i + " into map");
	if (i == careerBuilderResults.length) {
		console.log("numDupes: " + numDupes);
		console.log("done putting CB");
		callback(null, "done putting CB");
	} else if (careerBuilderResults[i]) {
		var company = JSON.stringify(careerBuilderResults[i].Company['$text']);
		var city = JSON.stringify(careerBuilderResults[i].City['$text']);
		var state = JSON.stringify(careerBuilderResults[i].State['$text']);
		var jobTitle = JSON.stringify(careerBuilderResults[i].JobTitle['$text']);
		var snippet = JSON.stringify(careerBuilderResults[i].DescriptionTeaser['$text']);
		var date = JSON.stringify(careerBuilderResults[i].PostedDate['$text']);
		var url = JSON.stringify(careerBuilderResults[i].JobServiceURL['$text']);

		var hash = hashJob(company, city, state, jobTitle, snippet);
		var value = "cb_company: " + company + "cb_city: " + city + "cb_state: " + state 
					+ "cb_jobTitle: " + jobTitle + "cb_snippet: " + snippet + "cb_date: " + date
					+ "cb_url: " + url;  
		if(!map[hash]) {
				map[hash] = value;
		} else {
			numDupes++;
			var v = map[hash];
			v += " DUPLICATE: " + value;
			map[hash] = v;
		}

		putCBIntoMap(i+1, callback);
	}
	
}

var hashJob = function(company, city, state, jobTitle, snippet) {
	var normComp = normalizeString(company);
	var normCity = normalizeString(city);
	var normState = normalizeString(state);
	var normJobTitle = normalizeString(jobTitle);
	var normSnip = normalizeString(snippet);
	if (normSnip.length > 100) {
			normSnip = normSnip.substring(0, 100);
		}
	var key = normComp + normCity + normState + normJobTitle + normSnip;
	var hash = crypto.createHash('md5').update(key).digest('hex');
	return hash;
}

var normalizeString = function(str) {
	var ret = '';
	if (str) {
		ret = str.replace(/\s/g, '');
	}
	
	return ret.toLowerCase();
};

var getCareerBuilder = function(query, location, page, callbackToSearch) {
	var i = 0;
	var cbQueryPath = "/v1/jobsearch?DeveloperKey=WDHS8FY734KMFC4YC4ZP";

	if (!query) {
		callbackToSearch("Please specify a job type", null);
	} else if (page > numCBPages) {
		callbackToSearch(null, careerBuilderResults);
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

		cbQueryPath += "&PageNumber=" + page;

		console.log("Career Builder query: api.careerbuilder.com" + cbQueryPath);

		var options = {
			host: 'api.careerbuilder.com',
			path: cbQueryPath
		};

		var request = http.get(options).on('response', function(response) {
			console.log("got an http response from cb");
			//callbackToSearch(null, response);
			callbackCareerBuilder(null, response, page, function(err, data) {
				if (err) {
					callbackToSearch(err, careerBuilderResults);
				} else {
					getCareerBuilder(query, location, page+1, callbackToSearch);
				}
			});
		});
	}
};

var callbackCareerBuilder = function(err, data, page, callbackErr) {

	if (err) {
		console.log("callbackCareerBuilder error!");
		callbackErr(err, null);
	} else if (data) {
		console.log("Processing career builder page " + page);
		var xml = new XmlStream(data, 'utf8');
		
		//Get total CB pages
		xml.preserve('TotalPages', true);
		xml.on('endElement: TotalPages', function(item) {
			numCBPages = parseInt(item['$text']);
			console.log("Total number of CB Pages: " + numCBPages);
		});

		xml.preserve('JobSearchResult', true);
		xml.collect('subitem');
		
		var i = (page -1) * 25 + 1;
		xml.on('endElement: JobSearchResult', function(item) {
			console.log("Adding career builder job " + i);
			careerBuilderResults[i] = item;
		 //  careerBuilderResults[i].company = JSON.stringify(item.Company['$name']) +' : ' 
		 //  					 + JSON.stringify(item.Company['$text']);
		 //  careerBuilderResults[i].companyDID = JSON.stringify(item.CompanyDID['$name']) +' : ' 
		 //  					 + JSON.stringify(item.CompanyDID['$text']);
		 //  careerBuilderResults[i].companyDetailsURL = JSON.stringify(item.CompanyDetailsURL['$name']) +' : ' 
		 //  					 + JSON.stringify(item.CompanyDetailsURL['$text']);
		 //  careerBuilderResults[i].DID = JSON.stringify(item.DID['$name']) +' : ' 
		 //  					 + JSON.stringify(item.DID['$text']);
		  
		  i++;
		});

		xml.on('endElement: Results', function() {
			callbackErr(null, careerBuilderResults);
		});
	}
};

var getIndeed = function(query, location, startIndex, callbackToSearch) {
	var i = 0;

	var indeedQueryPath = "/ads/apisearch?publisher=1474148037537663";
	if (!query) {
		callbackToSearch("Please specify a job type", null);
	} else if (startIndex >= numIndeedResults || startIndex > 1000) {
		callbackToSearch(null, indeedResults);
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
		indeedQueryPath += "&start=" + startIndex + "&limit=25";
		indeedQueryPath += "&sort=&radius=&st=&jt=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2";
		console.log("Indeed query: api.indeed.com" + indeedQueryPath);
		
		var options = {
			host: 'api.indeed.com',
			path: indeedQueryPath
		};

		var request = http.get(options).on('response', function(response) {
			console.log("got an http response from indeed");
			callbackIndeed(null, response, startIndex, function(err, data) {
				if (err) {
					callbackToSearch(null, indeedResults);
				} else {
					getIndeed(query, location, startIndex+25, callbackToSearch);
				}
			});
		}); 
	}
};

var callbackIndeed = function(err, data, startIndex, callbackErr) {
	if (err) {
		console.log("callbackIndeed error!");
		callbackErr(err, null);
	} else if (data) {
		console.log("Processing indeed start index " + startIndex);
		var xml = new XmlStream(data, 'utf8');
		
		//Get total indeed results
		xml.preserve('totalresults', true);
		xml.on('endElement: totalresults', function(item) {
			numIndeedResults = parseInt(item['$text']);
			console.log("Total number of Indeed results: " + numIndeedResults);
		});

		xml.preserve('result', true);
		xml.collect('subitem');
		
		var i = startIndex + 1;
		xml.on('endElement: result', function(item) {
			console.log("Adding indeed job " + i);
		  	indeedResults[i] = item;
		  // indeedResults[i] = {};
		  // indeedResults[i].jobtitle = JSON.stringify(item.jobtitle['$name']) +' : ' 
		  // 					 + JSON.stringify(item.jobtitle['$text']);
		  // indeedResults[i].company = JSON.stringify(item.company['$name']) +' : ' 
		  // 					 + JSON.stringify(item.company['$text']);
		  // indeedResults[i].city = JSON.stringify(item.city['$name']) +' : ' 
		  // 					 + JSON.stringify(item.city['$text']);
		  // indeedResults[i].state = JSON.stringify(item.state['$name']) +' : ' 
		  // 					 + JSON.stringify(item.state['$text']);
		  i++;
		});

		xml.on('endElement: results', function(item) {
			callbackErr(null, indeedResults);
		});
	}
};

//Route for login /login
var postLogin = function(req, res) {
	//Get the username and password from the form
	var username = req.body.username;
	var password = req.body.password;

	//Check if any field wasn't filled in
	if (!username || !password) {
		req.session.message = "All fields must be filled in";
		res.redirect('/');
	} else {
		//Check if the username and password match the database
		db.lookup_user(username, function (err, data) {
			if (err) {
				//Redirect to the login page with the error
				req.session.message = err;
				res.redirect('/');
			} else {
				//The user was found if error is null. Get the user's password in the DB

				data = JSON.parse(data);
				var dbPassword = data.password;
				var firstname = data.firstname;
				var lastname = data.lastname;

				//Compare passwords
				if (!dbPassword) {
					//If we never found a password, there's a problem...
					console.log("Database password was not found for user " + username);
					req.session.message = "There was a problem with your password. Contact the webmaster";
					res.redirect('/');
				} else {
					//Compare the hashed passwords
					bcrypt.compare(password, dbPassword, function (err, response) {
						if (response) {
							//The passwords matched - save the username and full name in the session and redirect to the home page
							req.session.user = username;
							
							//Get and save the user's full name
							var fullname = firstname + " " + lastname;
							req.session.fullname = fullname;
							res.redirect('/main');
							
						} else {
							//The passwords didn't match - redirect to the login page with an error message
							req.session.message = "This password doesn't match our records";
							res.redirect('/');	
						}
					});
				}
			}
		});
	}
};

//Route for logout
var getLogout = function(req, res) {
	//Get the username and password from the form
	var user = req.session.user;
	var fullname = req.session.fullname;
	req.session.user = null;
	req.session.fullname = null;
	res.redirect('/');
};

var getHome = function(req, res) {
	var message = "";
	if (req.session.message) {
		message = req.session.message;
	}

	var user = req.session.user;
	if (req.session.user) {
		var name = req.session.fullname;
		res.render('main.ejs', {message: message, name: name, user: user});
	} else {
		res.render('home.ejs', {message: message, user: user});
	}
};

//Route for signup page /signup
var getSignup = function(req, res) {
	//Render the page, given any messages
	var message = "";
	if (req.session.message) {
		message = req.session.message;
	}
	var user = req.session.user;
	res.render('signup.ejs', {message: message, user: user});
};

//Route for creating a user via POST
var postCreateUser = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;

	//Check if any field wasn't filled in
	if (!username || !password || !email || !firstname || !lastname) {
		req.session.message = "All fields must be filled in";
		res.redirect('/signup');
	} else {
		//Encrypt the password after generating a salt
		bcrypt.genSalt(10, function(err, salt) {
			if (err) {
				req.session.message = "There was an error generating a salt: " + err;
				res.redirect('/signup');
			} else {
				//Hash the password
				bcrypt.hash(password, salt, null, function(err, hash) {
					if (err) {
						req.session.message = "There was an error encrypting your password: " + err;
						res.redirect('/signup');
					}

					//Add the user with the hashed password
					db.add_user(username, {
						Pass: hash,
						Email: email,
						Firstname: firstname,
						Lastname: lastname
					}, function(err, data) {
						if (err) {
							req.session.message = err;
							res.redirect('/signup');
						} else {
							//Log the user in and redirect to the home page
							req.session.user = username;
							req.session.fullname = firstname + " " + lastname;
							res.redirect('/');
						}
					});
				});	
			}
		});
	}
};

var routes = {
	get_main: getMain,
	get_indeed: getIndeed,
	post_search: postSearch,
	get_signup: getSignup,
	post_create_user: postCreateUser,
	post_login: postLogin,
	get_home: getHome,
	get_logout: getLogout
}

module.exports = routes;