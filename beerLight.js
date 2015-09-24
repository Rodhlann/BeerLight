var https = require('https'); 
var gpio = require('gpio'); 

var active = "";

var red = gpio.export(4, {
   direction: "out",
   ready: function() {
   }
});

var grn = gpio.export(4, {
   direction: "out",
   ready: function() {
   }
});

function getStatus() {
	var options = { 
		hostname: 'beer30.sparcedge.com'	
	};
	https.get(options, function(res) { 
		var body = '';
		res.on('data', function(chunk) {
			body += chunk; 
		});
		res.on('end', function() {
			var status = JSON.stringify(body);
			var statusArray = status.split(" ");
			for(i = 0; i < 20; i++) {   
				if(statusArray[i] == "<b>GO</B>") {
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
		active = "";  
	}); 
}

var count = 0; 
function init() {
	getStatus();
	setTimeout(init, 1000); 
}

init();  

