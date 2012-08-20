var utils = {
	"isFlag":function(str){
		var flag = (str.charAt(0) === '-' && str.charAt(1) === '-') || (str.charAt(0) === '-' && str.length == 2);
		return flag;
	},
	"arrContains":function(arr,val){
		return arr.indexOf(val) != -1;
	}

}
