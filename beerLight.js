var https = require('https'); 
var fs = require('fs'); 

var active = "none";

var options = { 
	hostname: 'beer30.sparcedge.com'	
};

function getStatus() {
	https.get(options, function(res) { 
		var body = '';
		res.on('data', function(chunk) {
			body += chunk; 
		});
		res.on('end', function() {
			var status = JSON.stringify(body);
			var statusArray = status.split(" ");
			for(i = 0; i < 20; i++) {   
				if(statusArray[i] == "<b>Go</B>") {
					active = "on";
				}
				if(statusArray[i] == "<b>CAUTION</b>") {
					active = "caution"; 
				}
				if(statusArray[i] == "<b>STOP</b>") {
					active = "off";
				}
			}
		});
	}).on('error', function(e) {
		console.log(e);
		active = "none";  
	}); 
}

function writeStatus() { 
	fs.writeFile("/home/pepper/pi/scrape.txt", active, function(err) {
		if(err) {
			return console.log(err); 
		}
	});
}

var count = 0; 
function init() {
	getStatus();
	if(count > 0) {
		writeStatus();
		count = 1;  	
	}
	count ++; 
	setTimeout(init, 1000); 
}

init();  

