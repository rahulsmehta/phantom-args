var sys = require('system'),
		fs = require('fs');
		scriptArgs = sys.args.slice(1);

phantom.injectJs("lib/json2.js"); //not sure if necessary, might remove
phantom.injectJs("lib/jquery.min.js");

//Load args information from args.json
if(fs.exists("./args.json")){
	console.log("Reading args.json...");
	arg_list = JSON.parse(fs.read("./args.json"));
}



//Handle uses cases/types for command line flags
//-d -n, etc. stuff like that will be flagged if the first
//character in the string is a '-'. also, if an argument is flagged with
//-, and a string of characters follow (i.e. -ndXrj), then each one will be treated as 
//a flagged argument.


function processArgs(args){
	var result = {};
	for (var key in arg_list){
		result[key] = {
			"required":arg_list[key].required,
			"found":false,
			"value":null
		};
	}
	for(var i=0; i<args.length; ++i){
		var _arg = args[i];
		if(utils.isFlag(_arg)){ //processing a flagged argument
		
			for(var key in arg_list){
				var _flag = arg_list[key].flag
				
				if(utils.arrContains(_flag,_arg)){
					var log_str = key+" found"; 
					result[key].found=true;
					if(arg_list[key].type === "param"){
						var val = args[i+1];
						log_str+=": val -> "+val;
						result[key].value = val;
					}
					console.log(log_str);
					break;
				}
			}
		}
				
	}
	console.log(JSON.stringify(result));

}

var utils = {
	"isFlag":function(str){
		var flag = (str.charAt(0) === '-' && str.charAt(1) === '-') || (str.charAt(0) === '-' && str.length == 2);
		return flag;
	},
	"arrContains":function(arr,val){
		return arr.indexOf(val) != -1;
	}

}

processArgs(scriptArgs);

phantom.exit();
