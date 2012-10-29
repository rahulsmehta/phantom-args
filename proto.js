console.log(phantom.prototype);
phantom.prototype = {"hello":"world!"};
console.log(JSON.stringify(phantom.prototype));
phantom.exit(0);
