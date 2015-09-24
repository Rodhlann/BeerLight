var https = require('https'); 
var gpio = require('gpio'); 

var active = "";

var red = gpio.export(29, {
   direction: "out",
   ready: function() {
   }
});

var yel = gpio.export(33, {
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
					yel.set(); 
					red.set(0); 
				}
				if(statusArray[i] == "<b>CAUTION</b>") {
					yel.set(); 
					red.set(0); 
				}
				if(statusArray[i] == "<b>STOP</b>") {
					red.set(); 
					yel.set(0); 
				}
				else {
					red.unexport();
					yel.unexport(); 
					break
				}
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

