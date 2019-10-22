//----Hello World-------
// var http = require('http'); //http package which is build within node

// function serverCallback(req, res){
// 	res.writeHead(200, {'Content-Type': 'text/plain'}); //required for acp protocol, 200 default code
// 	//res.end("Hello World");
// 	res.end("Hello " + process.argv[2]); //process.argv pulls user input from command line
// }

// http.createServer(serverCallback).listen(8080); //listen to a given port


//---------------------- Event Loop -----------------------
//node was designed to exevute asynchronous tasks
// synchronous is like waterfall, one task then another in order
// var file = readFile("file.txt");
// var text = parseFile(file);
// var server = createServer(8080);


// asyncronous: each task will be allocated to a thread and they can executed in parallel. No guarenteed in the order they wil be executed
// function onRead(file){
// 	//do something
// }
// function onParsed(text){
// 	//do something
// }
// function onCreated(sever){
// 	//do something
// }
// readFile("file.txt", onRead);
// parseFile(file, onParsed);
// createServer(8080, onCreated);


// call back function allow syncronous in an asynchronous setup
// function onRead(file){
// 	parseFile(file, onParsed);
// }
// function onParsed(text){
// 	//do something
// }
// function onCreated(server){
// 	//do something
// }
// readFile("file.txt", onRead);
// createServer(8080, onCreated);


//the way node.js executes such asynchronous tasks is by means of the eventloop
// timers are responsible for timer events: setTimeout() will execute a callback after a given time. setIntercal() will execute the callback after every five seconds
// i/o callbacks execute callbacks for system operations such as asome tcp errors
// idle, prepare are used internally
// poll retrieves new i/o events and it executes as following: first it will execute callbacks from timer events, then it will process other events, then check setImmediate() events, then wait for futher events
// check will execute the setImmediate events
// close callbacks will execute close callbacks when a socket or a handle is closed abruptly

// process.nextTick(): special event, executed after the current operation completes, regardless of current phase, use is not recommended since it can lock your app in a reoccuring nextTick() indefinently
// better to use setImmediate()


//----------------------------- Node Package Manager ------------------------------
// allows you to easily manage the dependencies in your project. Basically, you create a package.json
// file with the information about your project. Then, everytime you add a new dependence to it, it will
// be added to the package.json file as well. This way, another person that wants to use your project
// ca simply install the dependencies from this file.

// var http = require('http');
// var moment = require('moment');

// function serverCallback(req, res){
// 	res.writeHead(200, {'Content-Type': 'text/plain'});
// 	var hour = moment().hours();
// 	var minute = moment().minutes();
// 	if(hour > 12){
// 		hour = 24 - hour + 10;
// 	} else if(hour < 10){
// 		hour = 10 - hour;
// 	} else {
// 		hour = 0;
// 	}

// 	if(minute > 0){
// 		hour = hour - 1;
// 		minute = 60 - minute;
// 	}
// 	res.end("Hello " + process.argv[2] + "! \n" +  "Welcome to my page. \n"
// 	 + "Now, it is " + moment().format('HH:mm:ss') + 
// 	 "\nOur business hours is from 10:00 to 12:00.\n" + "Please comeback in " + 
// 	 hour + " hours and " + minute + " minutes.");
// }

// http.createServer(serverCallback).listen(8080);


//----------------------------Moment-----------------------------------
var http = require('http');
var moment = require('moment');

function serverCallback(req, res){
	var begin_time = moment("10:00", "HH:mm");
	var end_time = moment("12:00", "HH:mm");

	var message = "Hello " + process.argv[2] + "1\n";
	message += "Welcome to our page.\n";
	message += "Now, it is " + moment().format("HH:mm") + ".\n";
	message += "Our business hours are from " + begin_time.format("HH:mm") + " to " + end_time.format("HH:mm") + ".\n";

	var begin_difference = begin_time.diff(moment(), 'minutes');
	var end_difference = moment().diff(end_time, 'hours');

	if(begin_difference > 0){
		message += "Please comeback in " + begin_difference + "minutes.\n";
	}
	if(end_difference > 0){
		message += "Please comeback tomorrow.\n";
	}

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(message);
}

http.createServer(serverCallback).listen(8080);