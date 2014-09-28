//Instantiate the app using the Express framework for Node
var express = require('express');
var routes = require('./routes/routes.js');
var app = express();

app.set('port', (process.env.PORT || 5000));

//Enable static files in /public for stylesheets, fonts, and client side javascript
app.use(express.static(__dirname + '/public'));

app.get('/', routes.get_main);

app.listen(app.get('port'), function() {
   console.log("Node app is running at localhost:" + app.get('port'))
})
