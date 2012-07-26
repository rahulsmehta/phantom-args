var sys = require('system'),
		fs = require('fs');
		scriptArgs = sys.args.slice(1),
		argInfo = "";

phantom.injectJs("lib/json2.js");

//Load args information from args.json
if(fs.exists("./args.json")){
	console.log("Reading args.json...");
	argInfo = JSON.parse(fs.read("./args.json"));
	console.log(argInfo);
}


console.log(scriptArgs);

//Handle uses cases/types for command line flags
//-d -n, etc. stuff like that will be flagged if the first
//character in the string is a '-'. also, if an argument is flagged with
//-, and a string of characters follow (i.e. -ndXrj), then each one will be treated as 
//a flagged argument.


function processArgs(args){
	while(args.length > 0){
		var _arg= args.pop();
		
		if(utils.isDouble(_arg)){} //process as double-flagged argument

		if(utils.isFlag(_arg)){ //processing a flagged argument
			
		}
	
				
	}

}

var utils = {
	"isDouble":function(str){
		return (str.charAt(0) === '-' && str.charAt(1) === '-');
	},
	"isFlag":function(str){
		return (str.charAt(0) === '-');
	}

}

phantom.exit();
