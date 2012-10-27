console.log(phantom.prototype);
phantom.prototype = {"hello":"world!"};
console.log(phantom.prototype);
phantom.exit(0);
