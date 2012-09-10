phantom-args
-----------

Command line argument utility for PhantomJS

[![Build Status](https://secure.travis-ci.org/rahulsmehta/phantom-args.png)](http://travis-ci.org/rahulsmehta/phantom-args)


### Features
* Specify command line argument options in `config.json`
* Found arguments (and values) are returned in nicely formatted JSON object
* Get on with writing your code, without the hassle of having to handle all argument options

### Usage
* First, specity what arguments you want your app to handle in the `config.json` file. `test1` is the unique identifier for that specific option, type can either be set to `option` or `param` (`param` will provide the subsequent argument as the parameter passed). Multiple "flags" for the processor to find can be specified in the array, and an additional "required" option can also be specified (this feature might be deprecated). 
<pre>
		{
			"test1":{
				"type":"option",
				"flag":['-t','--test1'],
				"required":false
			},
			"test2":{
				"type":"param",
				"flag":['--test2'],
				"required":true
			},
			"test3":{
				"type":"option",
				"flag":['--test3'],
				"required":false
			}
		}
</pre>
* Easy to use! Including the processor in a PhantomJS script requires just three simple lines of code:
<pre>
    var scriptArgs = require('system').args.slice(1);
    phantom.injectJs('args.js');
    var argResult = processArgs(scriptArgs);
</pre>
* Arguments returned in an easy-to-use JSON object. For example, if `app.js` is started with `phantomjs app.js --test2 testText --test1`, processArgs will return the following object. `value` is automatically set to null if the argument is of type `option`.
<pre>
		{
			"test1":{
				"required":false,
				"found":true,
				"value":null
			},
			"test2":{
				"required":true,
				"found":true,
				"value":"testText"
			},
			"test3":{
				"required":false,
				"found":false,
				"value":null
			}
		}
</pre>
* For more tutorials, take a look at the code examples, as well as the tests

### Coming soon
* Similar argument processor for Node.js applications (as an npm module)
* Possibly an all-in-one project

### Developers
If you wish to add features to phantom-args, fork me and send a pull request when completed. Before submitting a pull request, run the test suite for the project by running `npm test`. NOTE: To run the tests, Node.js (0.6.x or 0.8.x, not tested on 0.9.x), PhantomJS 1.6 or greater, npm 1.0.x, and jasmine-node must be installed. Tests are written in the Jasmine BDD testing framework.
