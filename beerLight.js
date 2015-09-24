var https = require('https'); 
var gpio = require('gpio'); 

var red = gpio.export(5, {
   direction: "out",
   ready: function() {
   }
});

var yel = gpio.export(13, {
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
			if(statusArray[18] == "<b>GO</B>") {
				yel.set(); 
				red.set(0); 
			}
			if(statusArray[18] == "<b>CAUTION</b>") {
				yel.set(); 
				red.set(0); 
			}
			if(statusArray[18] == "<b>STOP</b>") {
				red.set(); 
				yel.set(0); 
			}
			else {
				red.unexport();
				yel.unexport();
				return 0;  
			}
		});
	}).on('error', function(e) {
		console.log(e);
		red.unexport();
		yel.unexport(); 
	}); 
}

var count = 0; 
function init() {
	getStatus();
	setTimeout(init, 1000); 
}

init();  

