var exec = require('child_process').exec;

describe("Tests argument processing",function(){
	it("Tests app.js child process",function(){
		
		var _code = null;	

		var _app = exec('phantomjs ../app.js');
		_app.on('exit',function(code){
			_code = code;	
		});
		
		waitsFor(function(){
			return _code != null;
		},5000,"Waiting for app.js to exit timed out");

		runs(function(){
			expect(_code).toEqual(1,"app.js exited on wrong error code (0 instead of 1)");
		});
	});

});
