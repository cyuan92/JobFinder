//Instantiaate the app using the Express framework for Node
var express = require('express');
var app = express();

//Enable static files in /public for stylesheets, fonts, and client side javascript
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
   response.sent('Hello World!')
})

app.listen(app.get('port'), function() {
   console.log("Node app is running at localhost:" + app.get('port'))
})
