var sys = require('system'),
		fs = require('fs');

phantom.injectJs("./utils.js");

//Load args information from args.json
if(fs.exists("./config.json")){
	arg_list = JSON.parse(fs.read("./config.json"));
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
						log_str+="-> "+val;
						result[key].value = val;
					}
					break;
				}
			}
		}
				
	}
	return result;

}

