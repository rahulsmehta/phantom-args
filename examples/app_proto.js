//This example reads all json files in the current directory and then writes the
//content to stdout. However, flags may be used to specify the following options:
//	1. verbose: if set, the file content is printed. if not, just the filename.
//	2. logging: if logging is enabled, the script will write the same content that's
//		 going to stdout to a logfile with a default name (fs.log), unless the fn flag is enabled
//	3. logfile: if logging is enabled AND logfile is set, then the program will log to the 
//		 user-specified location

var fs = require('fs'),
		sys = require('system'),
		_args = sys.args.slice(1);

phantom.injectJs('../args.js');
processArgs(_args);

if(phantom.arg.verbose.found) console.log("Being verbose!");

if(phantom.arg.logging.found) console.log("Logging to file!");

if(phantom.arg.logfile.found) console.log("Logfile set to "+phantom.arg.logfile.value);

phantom.exit();

