                                 
var http = require('http');     // Import core module http to create server
var url = require('url');       // We are going to supply parameter via url pathname hence importing this module

var PORT = 3000;                // Define port

function handleRequest(request, response){     // Request handler function

		var urlObject = url.parse(request.url);     // Parse request url object to get pathname
		var name = urlObject.pathname;
		var patt = /^\/[a-zA-Z]/ig;					// Check for name starting with alphabets only
		var result = patt.test(name);				// check it
	    response.writeHead(200);

		if(!result){
			response.end("Type in url in this format only http://hostname:3000/[Name starting with alphabets only]");   // Ask to change the url to proper format
		}
		else{
			var name = name.replace('/','');
			var randNum = randomNumGenerator(name, 15, 6); 			// Call the random number generator function
			if(randNum.name === name){
				response.end(randNum.name + " " + randNum.rand);
			}				
		}
		
}

function randomNumGenerator(name, max, min){				// function to generate random number between two numbers excluding both
		var randNum = Math.floor(Math.random()*(max-min-1)+min+1);
		return {name : name, rand : randNum}
}

var server = http.createServer(handleRequest);   // Create a server

server.listen(PORT, function(){
	console.log("Server listening on: http://localhost:%s", PORT);
})
// #node answer.pseudo.js to start 