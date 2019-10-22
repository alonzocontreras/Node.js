var http = require('http');
var request = require('request');

var request_body = undefined;

function createHTMLStringFromJSON(retrievedData){
	var html_string = '<html>\n<header>\n<title>Data Aggrigator</title><\n</header>\n<body>\n<table>';

	html_string += '<tr>\n'; //first row of table: attribute names
	for(var attribute in retrievedData[0]){ // iterate through each data attribute and add a table cell to it (retrievedData is a json object)
		if(typeof retrievedData[0][attribute] !== 'object'){ //checks to see if the attribute is not another json object
			html_string += '<td>' + attribute + '</td>';
		}
	}
	html_string += '</tr>\n';

	retrievedData.forEach(function(object){
		html_string += '<tr>\n';
		for(var attribute in object){ // iterating the attributes in the object of all elements, not just the first
			if(typeof object[attribute] !== 'object'){ // data is not another object
				html_string += '<td>' + object[attribute] + '</td>\n'; // adding the value of the attribute
			}
		}
		html_string += '</tr>\n';
	});

	html_string += '</table>\n</body>\n</html>';

	return html_string;
}

request('https://www.bnefoodtrucks.com.au/api/1/trucks', function(err, request_res, body){
	request_body = body;
});

http.createServer(function(req, res){
	if(request_body){
		res.writeHead(200, {'Contnet-Type': 'text/plain'});
		res.end(createHTMLStringFromJSON(JSON.parse(request_body))); // parse the request body as a json object and then create the html string from it.
		//before sending the request_body we are going to call JSON to parse the string as a json object
	} else {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Nothing retrieved yet');
	}
}).listen(8080);

//created a table with json data, send html data to the client