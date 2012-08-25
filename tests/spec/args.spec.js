var exec = require('child_process').exec;

var utils = {
	"contains":function(orig,sub){
		return orig.indexOf(sub) != -1;
	},
	"exec":function(params){
		var _add = params || '';
		var result = exec('phantomjs app.js '+_add,function(err,stdout,stderr){
			console.log(err);
			console.log(stdout);
			console.log(stderr);
		});
		return result;
	}
}
//Changes to 'tests/' directory so tests don't fail
describe("Sets up tests",function(){
	it("Changes working directory",function(){
		process.chdir("tests/");
		expect(utils.contains(process.cwd(),"tests")).toBe(true,"Current working directory is not 'tests/'");
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
			expect(_code).toEqual(1,"app.js exited on success(0), expected error(1)");
		});
	});

	//Checks to see if app.js exits on success code when arg passed
	it("Tests app.js process - success(0)",function(){
		var _code = null,
				_app = utils.exec('-v');

		_app.on('exit',function(code,signal){
			_code = code;
		});

		waitsFor(function(){
			return _code != null;
		},5000,"Waiting for app.js to exit timed out - success");

		runs(function(){
			expect(_code).toEqual(0,"app.js exited on error(1), expected success(0)");	
		});

	}); 

});
