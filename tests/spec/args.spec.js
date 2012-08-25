var exec = require('child_process').exec,
		fs = require('fs');

var utils = {
	"contains":function(orig,sub){
		return orig.indexOf(sub) != -1;
	},
	"exec":function(params){
		var _add = params || '';
		var result = exec('phantomjs app.js '+_add);
		return result;
	},
}

//Changes to 'tests/' directory so tests don't fail
describe("Sets up tests",function(){
	it("Changes working directory",function(){
		process.chdir("tests/");
		expect(utils.contains(process.cwd(),"tests")).toBe(true,"Current working directory is not 'tests/'");
	});

	it("Checks for config.json",function(){
		var _exists = null;

		fs.readFile('./config.json','utf8',function(err,data){
			_exists = true;
		});

		waitsFor(function(){
			return _exists != null;	
		},1000,"Waiting for fs.readFile timed out");

		runs(function(){
			expect(_exists).toBe(true,"Expected config.json to exist - file not found");	
		});
	});
});


describe("Tests example app functionality",function(){
	//Checks to see if app.js exits on error coe when no args passed
	it("Tests app.js process - error(1)",function(){
		var _code = null,
				_app = utils.exec();

		_app.on('exit',function(code,signal){
			_code = code;	
		});
		
		waitsFor(function(){
			return _code != null;
		},5000,"Waiting for app.js to exit timed out - error");

		runs(function(){
			expect(_code).toEqual(1,"Expected error code (0), found ("+_code+")");
		});
	});

	//Checks to see if app.js exits on success code when arg passed
	it("Tests app.js process - success(0)",function(){
		var _code = null,
				_app = utils.exec('--test1');
		
		_app.on('exit',function(code,signal){
			_code = code;
		});

		waitsFor(function(){
			return _code != null;
		},5000,"Waiting for app.js to exit timed out - success");

		runs(function(){
			expect(_code).toEqual(0,"Expected error code (0), found ("+_code+")");	
		});

	}); 

});

describe("Tests argument processor functionality",function(){
	//Tests proper formatting of result data
	it("Checks base field formatting",function(){
		var _code = null,
				_data = null;

		var _app = utils.exec();

		_app.on('exit',function(code,signal){
			_code = code;
		});

		_app.stdout.on('data',function(data){
			_data = JSON.parse(data);
		});

		waitsFor(function(){
			return _code != null && _data != null;
		},5000,"Waiting for arguments object timed out - error");

		runs(function(){
			expect(_code).toEqual(1,"Expected error code (1), found ("+_code+")");
			expect(_data.test1).toBeDefined("test1 data undefined - data: "+JSON.stringify(_data));
			expect(_data.test2).toBeDefined("test2 data undefined - data: "+JSON.stringify(_data));
		});
	});

	it("Checks individual flag formatting (option)",function(){
		var _code = null,
				_data = null;

		var _app = utils.exec('--test1');

		_app.on('exit',function(code,signal){
			_code = code;
		});

		_app.stdout.on('data',function(data){
			_data = JSON.parse(data);
		});

		waitsFor(function(){
			return _code != null && _data != null;
		},5000,"Waiting for arguments object timed out - option (success)");

		runs(function(){
			expect(_code).toEqual(0,"Expected code (0), found ("+_code+")");
			expect(_data.test1).toBeDefined("test1 data undefined - data: "+JSON.stringify(_data));

			var _test1 = _data.test1;

			expect(_test1.found).toBe(true,"test1 flag not found - data: "+JSON.stringify(_test1));
		});
	});

	it("Checks individual flag formatting (param)",function(){
		var _code = null,
				_data = null;

		var _app = utils.exec('--test2 testText');

		_app.on('exit',function(code,signal){
			_code = code;
		});

		_app.stdout.on('data',function(data){
			_data = JSON.parse(data);
		});

		waitsFor(function(){
			return _code != null && _data != null;
		},5000,"Waiting for arguments object timed out - param (success)");

		runs(function(){
			expect(_code).toEqual(0,"Expected code (0), found ("+_code+")");
			expect(_data.test2).toBeDefined("test2 data undefined - data: "+JSON.stringify(_data));

			var _test2 = _data.test2;

			expect(_test2.found).toBe(true,"test2 flag not found - data: "+JSON.stringify(_test2));
			expect(_test2.value).toEqual("testText","test2 value incorrect; expected 'testText', found "+_test2.value);
		});
	});
	
});
