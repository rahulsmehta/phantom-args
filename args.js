var sys = require('system'),
		fs = require('fs');
		scriptArgs = sys.args.slice(1),
		argInfo = "";

phantom.injectJs("lib/json2.js"); //not sure if necessary, might remove
phantom.injectJs("lib/jquery.min.js");

//Load args information from args.json
if(fs.exists("./args.json")){
	console.log("Reading args.json...");
	argInfo = JSON.parse(fs.read("./args.json"));
}



//Handle uses cases/types for command line flags
//-d -n, etc. stuff like that will be flagged if the first
//character in the string is a '-'. also, if an argument is flagged with
//-, and a string of characters follow (i.e. -ndXrj), then each one will be treated as 
//a flagged argument.


function processArgs(args){
	while(args.length > 0){
		var _arg= args.pop();
		
		if(utils.isFlag(_arg)){ //processing a flagged argument
			for(var key in argInfo){
				if($.inArray(_arg,key.flag)){
					console.log("We found "+_arg);
				}
			}
		}
	
				
	}

}

var utils = {
	"isFlag":function(str){
		var flag = (str.charAt(0) === '-' && str.charAt(1) === '-') || (str.charAt(0) === '-' && str.length == 2);
		return flag;
	}

}


processArgs(scriptArgs);

phantom.exit();
