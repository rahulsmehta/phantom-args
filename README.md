phantom-args
-----------

Command line argument utility for PhantomJS

[![Build Status](https://secure.travis-ci.org/rahulsmehta/phantom-args.png)](http://travis-ci.org/rahulsmehta/phantom-args)


### Features
* Specify command line argument options in `args.json`
* Found arguments (and values) are returned in nicely formatted json object
* Easy to use! Including the processor in a PhantomJS script requires just three simple lines of code:
	var scriptArgs = require('system').args.slice(1);
	phantom.injectJs('args.js');
	var argResult = processArgs(scriptArgs);


### Coming soon
* Similar argument processor for Node.js applications
* Possibly an all-in-one project

### Developers
If you wish to add features to phantom-args, fork me and send a pull request when completed. Before submitting a pull request, run the test suite for the project by running `npm test`. NOTE: To run the tests, Node.js v0.6 or greater, PhantomJS 1.6 or greater, npm, and jasmine-node must be installed. 
