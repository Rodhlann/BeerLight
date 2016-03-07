var https = require('https'); 

function getStatus() {
	var options = { 
		hostname: 'beer30v2.sparcedge.com',
		"rejectUnauthorized": false
	};
	https.get(options, function(res) { 
		var body = '';
		res.on('data', function(chunk) {
			body += chunk; 
		});
		res.on('end', function() {
			var status = JSON.stringify(body); 
			if(status.indexOf("Drink up.") > -1) {
				console.log("Green"); 
			}
			else if(status.indexOf("Drinking is allowed but keep it discrete.") > -1) {
				console.log("Yellow"); 
			}
			else if(status.indexOf("No drinking allowed.") > -1) {
				console.log("Red"); 
			}
			else {
				console.log("Nope");
			}
		});
	}).on('error', function(e) {
		console.log(e);
	}); 
}

var count = 0; 
function init() {
	getStatus();
	setTimeout(init, 30000); 
}

init();  

