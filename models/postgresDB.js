// //Postgres db
var pg = require('pg');
var connectionString = process.env.DATABASE_URL;
var client;

client = new pg.Client(connectionString);
client.connect();

//Looks up a user given the username
var lookupUser = function(username, callback) {
	//var query = client.query('INSERT INTO visits(date) values($1)', [new Date()]);
	var query = client.query('select * from users where username = $1', [username]);
	var finished = false;
	var loginResults = null;

	query.on('row', function(result) {
		console.log("db row: " + JSON.stringify(result));
		if (result) {
			finished = true;
			loginResults = JSON.stringify(result);
		} 
	});

	query.on('end', function(result) {
		if (!finished) {
			callback("That username doesn't match our records", "No User");
		} else {
			callback(null, loginResults);
		}
		
	});
	
};

//Puts a user into the database
var addUser = function(username, profile, callback) {
	//Check if the username already exists
	lookupUser(username, function (err, data) {
		if (!err) {
			//Username was found
			callback("That username already exists", false);
		} else if (data === null) {
			//There was a database error
			callback(err, false);
		} else {
			//We're good, go ahead and add the user into the database

			var query = client.query('insert into users(username, password, email, firstname, lastname) values ($1, $2, $3, $4, $5)',
				[username, profile.Pass, profile.Email, profile.Firstname, profile.Lastname], 
				function(err, result) {
	                if (err) {
	                    console.log(err);
	                    callback(err, null);
	                } else {
	                    console.log('row inserted for username: ' + username);
	                    client.end();
	                    callback(null, "user added");
	                }
	            });   
		}
	});
};

var database = {
	add_user: addUser,
	lookup_user: lookupUser
};
                                        
module.exports = database;